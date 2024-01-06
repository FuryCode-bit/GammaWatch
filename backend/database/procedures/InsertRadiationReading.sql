CREATE PROCEDURE InsertRadiationReading(
    @received_value DECIMAL(10, 2), -- Assuming the received value is of type DECIMAL
    @reading_date varchar(20),
    @reading_time varchar(20),
    @radiation_level int(1)
)
AS
BEGIN
    DECLARE @sensor_IDS INT;

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
            VALUES (@sensor_IDS, @IDTS, @reading_date, @reading_time, @received_value, @radiation_level);
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
