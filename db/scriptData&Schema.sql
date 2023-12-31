USE [master]
GO
/****** Object:  Database [EarPhone]    Script Date: 8/24/2023 9:06:07 AM ******/
CREATE DATABASE [EarPhone]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'EarPhone', FILENAME = N'D:\SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\EarPhone.mdf' , SIZE = 73728KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'EarPhone_log', FILENAME = N'D:\SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\EarPhone_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [EarPhone] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [EarPhone].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [EarPhone] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [EarPhone] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [EarPhone] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [EarPhone] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [EarPhone] SET ARITHABORT OFF 
GO
ALTER DATABASE [EarPhone] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [EarPhone] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [EarPhone] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [EarPhone] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [EarPhone] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [EarPhone] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [EarPhone] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [EarPhone] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [EarPhone] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [EarPhone] SET  DISABLE_BROKER 
GO
ALTER DATABASE [EarPhone] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [EarPhone] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [EarPhone] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [EarPhone] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [EarPhone] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [EarPhone] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [EarPhone] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [EarPhone] SET RECOVERY FULL 
GO
ALTER DATABASE [EarPhone] SET  MULTI_USER 
GO
ALTER DATABASE [EarPhone] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [EarPhone] SET DB_CHAINING OFF 
GO
ALTER DATABASE [EarPhone] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [EarPhone] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [EarPhone] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [EarPhone] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'EarPhone', N'ON'
GO
ALTER DATABASE [EarPhone] SET QUERY_STORE = ON
GO
ALTER DATABASE [EarPhone] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [EarPhone]
GO
/****** Object:  Table [dbo].[carts]    Script Date: 8/24/2023 9:06:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[carts](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[quantity] [int] NOT NULL,
	[product_id] [int] NULL,
	[user_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[order_details]    Script Date: 8/24/2023 9:06:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[order_details](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[quantity] [int] NOT NULL,
	[order_id] [int] NULL,
	[product_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[orders]    Script Date: 8/24/2023 9:06:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[orders](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[order_date] [datetime2](7) NULL,
	[total_amount] [float] NOT NULL,
	[user_id] [int] NULL,
	[isconfirm] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[products]    Script Date: 8/24/2023 9:06:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[products](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[description] [varchar](255) NULL,
	[image] [varchar](255) NULL,
	[name] [varchar](255) NULL,
	[price] [float] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[users]    Script Date: 8/24/2023 9:06:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[users](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[email] [varchar](255) NULL,
	[fullname] [varchar](255) NULL,
	[password] [varchar](255) NULL,
	[username] [varchar](255) NULL,
	[address] [varchar](255) NULL,
	[phone] [varchar](255) NULL,
	[role] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[carts] ON 

INSERT [dbo].[carts] ([id], [quantity], [product_id], [user_id]) VALUES (1166, 1, 35, 1014)
INSERT [dbo].[carts] ([id], [quantity], [product_id], [user_id]) VALUES (1190, 1, 34, 1015)
SET IDENTITY_INSERT [dbo].[carts] OFF
GO
SET IDENTITY_INSERT [dbo].[order_details] ON 

INSERT [dbo].[order_details] ([id], [quantity], [order_id], [product_id]) VALUES (49, 1, 60, 36)
INSERT [dbo].[order_details] ([id], [quantity], [order_id], [product_id]) VALUES (50, 1000, 60, 37)
INSERT [dbo].[order_details] ([id], [quantity], [order_id], [product_id]) VALUES (55, 10001, 65, 35)
INSERT [dbo].[order_details] ([id], [quantity], [order_id], [product_id]) VALUES (56, 1, 66, 35)
INSERT [dbo].[order_details] ([id], [quantity], [order_id], [product_id]) VALUES (57, 9998, 66, 34)
INSERT [dbo].[order_details] ([id], [quantity], [order_id], [product_id]) VALUES (64, 1000, 72, 38)
INSERT [dbo].[order_details] ([id], [quantity], [order_id], [product_id]) VALUES (65, 1, 73, 38)
INSERT [dbo].[order_details] ([id], [quantity], [order_id], [product_id]) VALUES (66, 1, 73, 34)
INSERT [dbo].[order_details] ([id], [quantity], [order_id], [product_id]) VALUES (67, 1000, 73, 37)
SET IDENTITY_INSERT [dbo].[order_details] OFF
GO
SET IDENTITY_INSERT [dbo].[orders] ON 

INSERT [dbo].[orders] ([id], [order_date], [total_amount], [user_id], [isconfirm]) VALUES (60, CAST(N'2023-08-14T10:11:30.0340000' AS DateTime2), 18019, 4, 1)
INSERT [dbo].[orders] ([id], [order_date], [total_amount], [user_id], [isconfirm]) VALUES (65, CAST(N'2023-08-15T09:44:28.6140000' AS DateTime2), 260026, 1002, 1)
INSERT [dbo].[orders] ([id], [order_date], [total_amount], [user_id], [isconfirm]) VALUES (66, CAST(N'2023-08-15T09:50:46.5860000' AS DateTime2), 349956, 1012, 1)
INSERT [dbo].[orders] ([id], [order_date], [total_amount], [user_id], [isconfirm]) VALUES (72, CAST(N'2023-08-16T10:28:25.8340000' AS DateTime2), 20000, 1015, 1)
INSERT [dbo].[orders] ([id], [order_date], [total_amount], [user_id], [isconfirm]) VALUES (73, CAST(N'2023-08-16T20:19:04.3280000' AS DateTime2), 18055, 1015, 1)
SET IDENTITY_INSERT [dbo].[orders] OFF
GO
SET IDENTITY_INSERT [dbo].[products] ON 

INSERT [dbo].[products] ([id], [description], [image], [name], [price]) VALUES (34, N'"The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.', N'pro1.png', N'Tai nghe Marshall', 35)
INSERT [dbo].[products] ([id], [description], [image], [name], [price]) VALUES (35, N'The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.', N'pro2.png', N'Sony WH-CH510', 26)
INSERT [dbo].[products] ([id], [description], [image], [name], [price]) VALUES (36, N'The adidas Primeknit upper wraps the foot with a supportive fit that enhances movem', N'pro3.png', N'SONY XB550AP', 19)
INSERT [dbo].[products] ([id], [description], [image], [name], [price]) VALUES (37, N'The adidas Primeknit upper wraps the foot with a supportive fit that enhances', N'pro4.png', N'EXTRA WH-XB700', 18)
INSERT [dbo].[products] ([id], [description], [image], [name], [price]) VALUES (38, N'The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement', N'pro5.png', N'Quietcomfort 45', 20)
INSERT [dbo].[products] ([id], [description], [image], [name], [price]) VALUES (39, N'The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement', N'pro6.png', N'Marshall MID', 48)
INSERT [dbo].[products] ([id], [description], [image], [name], [price]) VALUES (40, N'The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.', N'pro7.png', N'Shokz OpenSwim', 48)
INSERT [dbo].[products] ([id], [description], [image], [name], [price]) VALUES (41, N'The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.', N'pro9.png', N'Shokz Openrun', 39)
INSERT [dbo].[products] ([id], [description], [image], [name], [price]) VALUES (44, N'qua tuyet voi', N'pro6.png', N'Tai nghe Marshall', 979)
SET IDENTITY_INSERT [dbo].[products] OFF
GO
SET IDENTITY_INSERT [dbo].[users] ON 

INSERT [dbo].[users] ([id], [email], [fullname], [password], [username], [address], [phone], [role]) VALUES (4, N'hieunv0708@gmail.com', N'Nguyen Van Hieu', N'07082001@S', N'hieunv65', N'Da Nang', N'0357938256', N'admin')
INSERT [dbo].[users] ([id], [email], [fullname], [password], [username], [address], [phone], [role]) VALUES (1002, N'hieunv0708@gmail.com', N'Nguyen Van Hieu       ', N'123456@N', N'camhv', N'Quang Nam', N'0934934958', NULL)
INSERT [dbo].[users] ([id], [email], [fullname], [password], [username], [address], [phone], [role]) VALUES (1012, N'tuatp@gmail.com', N'Pham Tuat', N'123456', N'user', N'Hue Mong Mo', N'02934085803', NULL)
INSERT [dbo].[users] ([id], [email], [fullname], [password], [username], [address], [phone], [role]) VALUES (1014, N'hieunv0708@gmail.com', N'Nguyen Van Hieu', N'123456@S', N'Sol78', N'Da Nang', N'0357938256', NULL)
INSERT [dbo].[users] ([id], [email], [fullname], [password], [username], [address], [phone], [role]) VALUES (1015, N'hieunv0708@gmail.com', N'Nguyen Van Hieu', N'123456@H', N'hauke12', N'Quang Nam', N'0357938256', NULL)
SET IDENTITY_INSERT [dbo].[users] OFF
GO
ALTER TABLE [dbo].[carts]  WITH CHECK ADD  CONSTRAINT [FKb5o626f86h46m4s7ms6ginnop] FOREIGN KEY([user_id])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[carts] CHECK CONSTRAINT [FKb5o626f86h46m4s7ms6ginnop]
GO
ALTER TABLE [dbo].[carts]  WITH CHECK ADD  CONSTRAINT [FKmd2ap4oxo3wvgkf4fnaye532i] FOREIGN KEY([product_id])
REFERENCES [dbo].[products] ([id])
GO
ALTER TABLE [dbo].[carts] CHECK CONSTRAINT [FKmd2ap4oxo3wvgkf4fnaye532i]
GO
ALTER TABLE [dbo].[order_details]  WITH CHECK ADD  CONSTRAINT [FK4q98utpd73imf4yhttm3w0eax] FOREIGN KEY([product_id])
REFERENCES [dbo].[products] ([id])
GO
ALTER TABLE [dbo].[order_details] CHECK CONSTRAINT [FK4q98utpd73imf4yhttm3w0eax]
GO
ALTER TABLE [dbo].[order_details]  WITH CHECK ADD  CONSTRAINT [FKjyu2qbqt8gnvno9oe9j2s2ldk] FOREIGN KEY([order_id])
REFERENCES [dbo].[orders] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[order_details] CHECK CONSTRAINT [FKjyu2qbqt8gnvno9oe9j2s2ldk]
GO
ALTER TABLE [dbo].[orders]  WITH CHECK ADD  CONSTRAINT [FK32ql8ubntj5uh44ph9659tiih] FOREIGN KEY([user_id])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[orders] CHECK CONSTRAINT [FK32ql8ubntj5uh44ph9659tiih]
GO
USE [master]
GO
ALTER DATABASE [EarPhone] SET  READ_WRITE 
GO
