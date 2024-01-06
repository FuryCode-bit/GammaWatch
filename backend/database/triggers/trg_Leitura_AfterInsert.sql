CREATE TRIGGER trg_Leitura_AfterInsert
ON [dbo].[Leitura]
AFTER INSERT
AS
BEGIN
    DECLARE @IDNR INT

    -- Get the inserted IDNR
    SELECT TOP 1 @IDNR = IDNR
    FROM inserted

    -- Update IDF based on the new value surpassing the highest value and then decreasing by 20%
    DECLARE @CurrentValue FLOAT

    SELECT @CurrentValue = valor
    FROM inserted

    DECLARE @CurrentIDF INT

    DECLARE @IDNA INT

    SELECT @CurrentIDF = MAX(IDF)
    FROM [dbo].[Sensor]
    WHERE IDS = (SELECT IDS FROM inserted)
        AND IDE = (SELECT IDE FROM inserted)

    DECLARE @LastSixMonthsMaxValue FLOAT

    -- Get the maximum value of the last 6 months readings for the specific sensor (IDS and IDE)
    SELECT @LastSixMonthsMaxValue = AVG(valor)
    FROM [dbo].[Leitura]
    WHERE CONVERT(DATE, dia, 103) >= DATEADD(MONTH, DATEDIFF(MONTH, 0, GETDATE()) - 6, 0)
        AND CONVERT(DATE, dia, 103) < DATEADD(MONTH, DATEDIFF(MONTH, 0, GETDATE()), 0)
        AND IDE = (SELECT IDE FROM inserted)  -- Filter by the inserted IDE

    PRINT 'Last Six Months Max Value: ' + CAST(@LastSixMonthsMaxValue AS NVARCHAR(20))
	PRINT 'CurrentValue: ' + CAST(@CurrentValue AS NVARCHAR(20))
	PRINT 'CurrentValue: ' + CAST(@LastSixMonthsMaxValue * 1.1 AS NVARCHAR(20))

    -- Check if the current value is greater than 10% of the maximum value of last 6 months readings
    IF (@CurrentValue > (@LastSixMonthsMaxValue * 1.1) AND @IDNR > 1)
    BEGIN
        PRINT 'Adding Alerta for exceeding 10% threshold'

            -- Update IDNA based on IDNR values in the inserted table
        select @IDNA = 
            CASE 
                WHEN @IDNR < 4 THEN 1
                WHEN @IDNR >= 4 AND @IDNR < 6 THEN 2
                WHEN @IDNR >= 6 THEN 3
            END;

        -- Insert the modified values into the target table
        INSERT INTO [dbo].[Alerta] (IDS, IDE, dia, hora, IDNA)
        SELECT IDS, IDE, dia, hora, @IDNA
        FROM inserted;

        -- Update IDF based on the new value surpassing the highest value and then decreasing by 20%
        IF @CurrentIDF > 1
        BEGIN
            PRINT 'Decreasing IDF by 1'
            UPDATE [dbo].[Sensor]
            SET IDF = @CurrentIDF - 1
            WHERE IDS = (SELECT IDS FROM inserted)
                AND IDE = (SELECT IDE FROM inserted)
        END
        ELSE
        BEGIN
            PRINT 'Setting IDF to 1 (minimum)'
            UPDATE [dbo].[Sensor]
            SET IDF = 1
            WHERE IDS = (SELECT IDS FROM inserted)
                AND IDE = (SELECT IDE FROM inserted)
        END
    END
    ELSE
    BEGIN
        DECLARE @HighValue FLOAT

        SELECT @HighValue = MAX(valor)
        FROM [dbo].[Leitura]
        WHERE IDE = (SELECT IDE FROM inserted)
            AND valor > @LastSixMonthsMaxValue

        PRINT 'High Value: ' + CAST(@HighValue AS NVARCHAR(20))
        PRINT '@CurrentValue: ' + CAST(@CurrentValue AS NVARCHAR(20))
        PRINT '(@HighValue * 0.8): ' + CAST(@HighValue * 0.8 AS NVARCHAR(20))

        IF @CurrentValue < (@HighValue * 0.8) AND @HighValue IS NOT NULL
        BEGIN
            PRINT 'Updating IDF based on lower threshold'

            IF @CurrentIDF < 3
            BEGIN
                PRINT 'Increasing IDF by 1'
                UPDATE [dbo].[Sensor]
                SET IDF = @CurrentIDF + 1
                WHERE IDS = (SELECT IDS FROM inserted)
                    AND IDE = (SELECT IDE FROM inserted)
            END
            ELSE
            BEGIN
                PRINT 'Setting IDF to 3 (maximum)'
                UPDATE [dbo].[Sensor]
                SET IDF = 3
                WHERE IDS = (SELECT IDS FROM inserted)
                    AND IDE = (SELECT IDE FROM inserted)
            END
        END
    END
END