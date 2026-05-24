using Microsoft.Data.SqlClient;
using Models;
using RestauranteAPI.Models;

namespace RestauranteAPI.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly string _connectionString;

        public UserRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("RestauranteDB") ?? "Not found";
        }

        public UserDtoOut AddUserFromCredentials(UserDtoIn userDtoIn)
        {
            using var connection = new SqlConnection(_connectionString);
            connection.Open();

            // Comprobar si el email ya existe
            var checkQuery = "SELECT COUNT(*) FROM Users WHERE Email = @Email";
            using var checkCmd = new SqlCommand(checkQuery, connection);
            checkCmd.Parameters.AddWithValue("@Email", userDtoIn.Email);
            var count = (int)checkCmd.ExecuteScalar();
            if (count > 0)
                throw new Exception("El email ya está registrado.");

            // Insertar usuario nuevo
            var insertQuery = @"
                INSERT INTO Users (UserName, Email, Password, Role)
                OUTPUT INSERTED.Id
                VALUES (@UserName, @Email, @Password, @Role)";
            using var insertCmd = new SqlCommand(insertQuery, connection);
            insertCmd.Parameters.AddWithValue("@UserName", userDtoIn.UserName);
            insertCmd.Parameters.AddWithValue("@Email",    userDtoIn.Email);
            insertCmd.Parameters.AddWithValue("@Password", userDtoIn.Password);
            insertCmd.Parameters.AddWithValue("@Role",     Roles.User);

            var newId = (int)insertCmd.ExecuteScalar();

            return new UserDtoOut
            {
                UserId   = newId,
                UserName = userDtoIn.UserName,
                Email    = userDtoIn.Email,
                Role     = Roles.User
            };
        }

        public UserDtoOut GetUserFromCredentials(LoginDtoIn loginDtoIn)
        {
            using var connection = new SqlConnection(_connectionString);
            connection.Open();

            var query = "SELECT Id, UserName, Email, Role FROM Users WHERE Email = @Email AND Password = @Password";
            using var cmd = new SqlCommand(query, connection);
            cmd.Parameters.AddWithValue("@Email",    loginDtoIn.Email);
            cmd.Parameters.AddWithValue("@Password", loginDtoIn.Password);

            using var reader = cmd.ExecuteReader();
            if (!reader.Read())
                throw new KeyNotFoundException("Usuario o contraseña incorrectos.");

            return new UserDtoOut
            {
                UserId   = reader.GetInt32(0),
                UserName = reader.GetString(1),
                Email    = reader.GetString(2),
                Role     = reader.GetString(3)
            };
        }

        public void Add(UserDtoIn user)             => throw new NotImplementedException();
        public IEnumerable<UserDtoOut> GetAll()     => throw new NotImplementedException();
        public UserDtoOut Get(int id)               => throw new NotImplementedException();
        public void Update(UserDtoIn user)          => throw new NotImplementedException();
        public void Delete(int id)                  => throw new NotImplementedException();
    }
}