CREATE PROCEDURE [dbo].[InsertRadiationReading](
    @received_value DECIMAL(30, 2), -- Assuming the received value is of type DECIMAL
    @reading_date varchar(20),
    @reading_time varchar(20),
	@IDE int
)
AS
BEGIN
    DECLARE @sensor_IDS INT;
    DECLARE @nivel_radiacao INT;

    DECLARE @value_in_mSv FLOAT;
    SET @value_in_mSv = @received_value / 1000000.0;

    IF @value_in_mSv >= 6000
        SET @nivel_radiacao = 8;
    ELSE IF @value_in_mSv >= 3000 AND @value_in_mSv < 6000
        SET @nivel_radiacao = 7;
    ELSE IF @value_in_mSv >= 1000 AND @value_in_mSv < 3000
        SET @nivel_radiacao = 6;
    ELSE IF @value_in_mSv >= 700 AND @value_in_mSv < 1000
        SET @nivel_radiacao = 5;
    ELSE IF @value_in_mSv >= 250 AND @value_in_mSv < 700
        SET @nivel_radiacao = 4;
    ELSE IF @value_in_mSv >= 100 AND @value_in_mSv < 250
        SET @nivel_radiacao = 3;
    ELSE IF @value_in_mSv >= 10 AND @value_in_mSv < 100
        SET @nivel_radiacao = 2;
    ELSE IF @value_in_mSv >= 0 AND @value_in_mSv < 10
        SET @nivel_radiacao = 1;

    -- Find IDTS for the interval the reading falls into
    DECLARE @IDTS INT;
    SELECT @IDTS = IDTS
    FROM TipoSensor
    WHERE @received_value BETWEEN min_gama_radiacao AND max_gama_radiacao;

    IF @IDTS IS NOT NULL
    BEGIN
        -- Find IDS of the sensor with the same IDE
        SELECT @sensor_IDS = IDS
        FROM Sensor
        WHERE IDTS = @IDTS;

        IF @sensor_IDS IS NOT NULL
        BEGIN
            -- Insert Leitura with discovered IDS
            INSERT INTO Leitura (IDS, IDE, dia, hora, valor, IDNR)
            VALUES (@sensor_IDS, @IDE, @reading_date, @reading_time, @received_value, @nivel_radiacao);

        END
        ELSE
        BEGIN
            -- Handle the case when IDS is not found
            PRINT 'Sensor IDS not found';
            -- You might want to handle or log this scenario accordingly
        END
    END
    ELSE
    BEGIN
        -- Handle the case when the received value doesn't fall within any sensor's radiation range
        PRINT 'Value does not fall within any sensor range';
        -- You might want to handle or log this scenario accordingly
    END
END;
