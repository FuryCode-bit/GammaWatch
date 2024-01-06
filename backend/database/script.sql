USE [master]
GO
/****** Object:  Database [gammawatch]    Script Date: 06/01/2024 19:53:30 ******/
CREATE DATABASE [gammawatch]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'gammawatch', FILENAME = N'/var/opt/mssql/data/gammawatch.mdf' , SIZE = 73728KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'gammawatch_log', FILENAME = N'/var/opt/mssql/data/gammawatch_log.ldf' , SIZE = 270336KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [gammawatch] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [gammawatch].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [gammawatch] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [gammawatch] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [gammawatch] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [gammawatch] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [gammawatch] SET ARITHABORT OFF 
GO
ALTER DATABASE [gammawatch] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [gammawatch] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [gammawatch] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [gammawatch] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [gammawatch] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [gammawatch] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [gammawatch] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [gammawatch] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [gammawatch] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [gammawatch] SET  ENABLE_BROKER 
GO
ALTER DATABASE [gammawatch] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [gammawatch] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [gammawatch] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [gammawatch] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [gammawatch] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [gammawatch] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [gammawatch] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [gammawatch] SET RECOVERY FULL 
GO
ALTER DATABASE [gammawatch] SET  MULTI_USER 
GO
ALTER DATABASE [gammawatch] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [gammawatch] SET DB_CHAINING OFF 
GO
ALTER DATABASE [gammawatch] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [gammawatch] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [gammawatch] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [gammawatch] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'gammawatch', N'ON'
GO
ALTER DATABASE [gammawatch] SET QUERY_STORE = OFF
GO
USE [gammawatch]
GO
/****** Object:  Table [dbo].[Accao]    Script Date: 06/01/2024 19:53:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Accao](
	[IDA] [int] IDENTITY(1,1) NOT NULL,
	[descricao_accao] [varchar](255) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[IDA] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AcoesTomar]    Script Date: 06/01/2024 19:53:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AcoesTomar](
	[IDNA] [int] NOT NULL,
	[IDA] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Alerta]    Script Date: 06/01/2024 19:53:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Alerta](
	[IDS] [int] NOT NULL,
	[IDE] [int] NOT NULL,
	[dia] [varchar](20) NOT NULL,
	[hora] [varchar](20) NOT NULL,
	[IDNA] [int] NOT NULL,
 CONSTRAINT [PK_Alerta] PRIMARY KEY CLUSTERED 
(
	[IDS] ASC,
	[IDE] ASC,
	[dia] ASC,
	[hora] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Estacao]    Script Date: 06/01/2024 19:53:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Estacao](
	[IDE] [int] IDENTITY(1,1) NOT NULL,
	[localizacao] [varchar](20) NOT NULL,
	[latitude] [varchar](20) NOT NULL,
	[longitude] [varchar](20) NOT NULL,
	[codigoPostal] [varchar](8) NOT NULL,
	[data_instalacao] [date] NOT NULL,
	[tipo] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[IDE] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FreqLeitura]    Script Date: 06/01/2024 19:53:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FreqLeitura](
	[IDF] [int] IDENTITY(1,1) NOT NULL,
	[frequencia] [varchar](60) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[IDF] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Leitura]    Script Date: 06/01/2024 19:53:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Leitura](
	[IDS] [int] NOT NULL,
	[IDE] [int] NOT NULL,
	[dia] [varchar](20) NOT NULL,
	[hora] [varchar](20) NOT NULL,
	[valor] [float] NOT NULL,
	[IDNR] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[IDS] ASC,
	[IDE] ASC,
	[dia] ASC,
	[hora] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[NivelAlerta]    Script Date: 06/01/2024 19:53:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NivelAlerta](
	[IDNA] [int] IDENTITY(1,1) NOT NULL,
	[nivel] [int] NOT NULL,
	[descricao] [varchar](255) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[IDNA] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[NivelRadiacao]    Script Date: 06/01/2024 19:53:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NivelRadiacao](
	[IDNR] [int] NOT NULL,
	[nivel] [int] NOT NULL,
	[descricao_nivel] [varchar](60) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[IDNR] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Sensor]    Script Date: 06/01/2024 19:53:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sensor](
	[IDS] [int] IDENTITY(1,1) NOT NULL,
	[IDE] [int] NOT NULL,
	[IDTS] [int] NOT NULL,
	[IDF] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[IDS] ASC,
	[IDE] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TipoEstacao]    Script Date: 06/01/2024 19:53:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TipoEstacao](
	[IDTE] [int] IDENTITY(1,1) NOT NULL,
	[descricao] [varchar](255) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[IDTE] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TipoSensor]    Script Date: 06/01/2024 19:53:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TipoSensor](
	[IDTS] [int] IDENTITY(1,1) NOT NULL,
	[modelo] [varchar](60) NOT NULL,
	[max_sensibilidade] [float] NOT NULL,
	[min_sensibilidade] [float] NOT NULL,
	[min_gama_radiacao] [float] NOT NULL,
	[max_gama_radiacao] [float] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[IDTS] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[AcoesTomar]  WITH CHECK ADD FOREIGN KEY([IDA])
REFERENCES [dbo].[Accao] ([IDA])
GO
ALTER TABLE [dbo].[AcoesTomar]  WITH CHECK ADD FOREIGN KEY([IDNA])
REFERENCES [dbo].[NivelAlerta] ([IDNA])
GO
ALTER TABLE [dbo].[Alerta]  WITH CHECK ADD FOREIGN KEY([IDS], [IDE], [dia], [hora])
REFERENCES [dbo].[Leitura] ([IDS], [IDE], [dia], [hora])
GO
ALTER TABLE [dbo].[Alerta]  WITH CHECK ADD FOREIGN KEY([IDNA])
REFERENCES [dbo].[NivelAlerta] ([IDNA])
GO
ALTER TABLE [dbo].[Estacao]  WITH CHECK ADD FOREIGN KEY([tipo])
REFERENCES [dbo].[TipoEstacao] ([IDTE])
GO
ALTER TABLE [dbo].[Leitura]  WITH CHECK ADD FOREIGN KEY([IDS], [IDE])
REFERENCES [dbo].[Sensor] ([IDS], [IDE])
GO
ALTER TABLE [dbo].[Leitura]  WITH CHECK ADD FOREIGN KEY([IDNR])
REFERENCES [dbo].[NivelRadiacao] ([IDNR])
GO
ALTER TABLE [dbo].[Sensor]  WITH CHECK ADD FOREIGN KEY([IDE])
REFERENCES [dbo].[Estacao] ([IDE])
GO
ALTER TABLE [dbo].[Sensor]  WITH CHECK ADD FOREIGN KEY([IDF])
REFERENCES [dbo].[FreqLeitura] ([IDF])
GO
ALTER TABLE [dbo].[Sensor]  WITH CHECK ADD FOREIGN KEY([IDTS])
REFERENCES [dbo].[TipoSensor] ([IDTS])
GO
/****** Object:  StoredProcedure [dbo].[InsertRadiationReading]    Script Date: 06/01/2024 19:53:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[InsertRadiationReading](
    @received_value DECIMAL(10, 2), -- Assuming the received value is of type DECIMAL
    @reading_date varchar(20),
    @reading_time varchar(20),
	@IDE int,
    @radiation_level int
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
            VALUES (@sensor_IDS, @IDE, @reading_date, @reading_time, @received_value, @radiation_level);
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
GO
USE [master]
GO
ALTER DATABASE [gammawatch] SET  READ_WRITE 
GO
