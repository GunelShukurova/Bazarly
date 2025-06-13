import instance from "../instance";
import { endpoints } from "../../constants";


export async function getAllUsers() {
    try { 
        const response = await instance.get(endpoints.users)
        return {
            data: response.data,
            message: "users received successfully!",
        }
    } catch (error) {
        return {
            data: null,
            message: "failed to get users!"
        }
    }
} 

export async function getUserById(id) {
    try {
        const response = await instance.get(endpoints.users + `/${id}`)
        return {
            data: response.data,
            message: "User received successfully!",
            success: true
        };
    } catch (error) {
  
        return {
            data: null,
            message: "Failed to get user!",
            success: false
        }; 
    }
}

export async function register(newUser) {

    try{
    const {success:emailOk}= await  checkDuplicateEmail(newUser.email)
if(!emailOk){
return{
    data:null,
    message: "email already in use!"
}

}
const {success:usernameOk}= await  checkDuplicateUsername(newUser.username)
if(!usernameOk){
return{
    data:null,
    message: "username already in use!"
}

}
const response = await instance.post(endpoints.users, newUser)

 
        return {
            data: response.data,
            message: "user registered successfully",
        }

    } catch (error) {
        console.log("User registered:", response.data);
        return {
            data: null,
            message: "failed to register!"

        }
    }
}

export async function login(email, password) {

    try {
        const { data: users } = await getAllUsers()
        const isValid = users.find((u) => u.email === email && u.password === password && u.role === "client")
        if (isValid) {
            await instance.patch(endpoints.users + `/${isValid.id}`, {
                lastLogin: new Date(),
            });
            return {
                data: isValid,
                message: "User logged in successfully!",
            };
        } else {
            return {
                data: null,
                message: "Email or password is incorrect!",
            };
        }
    } catch (error) {
        return {
            data: null,
            message: "Login failed!",
        };
    }}

export async function checkDuplicateUsername(username) {
    try {
        const {data:users } =await instance.get (`${endpoints.users}`);
const isUsernameTaken= users.some ((user)=>user.username===username);
      
        if (isUsernameTaken) {
            return {
                success: false,
                message: "username already in use!",
            }
        }
        else {
            return {
                success: true,
                message: "username is available!",
            }
        }
    } catch (error) {
        return {
              data:null,
            message: "failed to check  username!"
        }
    }
}


export async function checkDuplicateEmail(email) {

    try {
const {data:users } =await instance.get (`${endpoints.users}`);
const isEmailTaken= users.some ((user)=>user.email===email);


        if (isEmailTaken) {
            return {
                success: false,
                message: "email already in use!",
            }
        }
        else {
            return {
                success: true,
                message: "email is available!",
            }
        }
    } catch (error) {
        return {
            data: null,
            message: "failed to check  email!"
        }
    }
}


export async function addBalance(id, balance) {
    try {
        const response = await instance.patch(endpoints.users + `/${id}`, {
            balance: balance,
        })
        return {
            data: response.data,
            message: "balance updated successfully!",
        }
    } catch (error) {
        return {
            data: response.data,
            message: "balance update failed!"
        }
    }
}
 
export async function updatePassword(id, currentPassword, newPassword) {
    try {
        const { data: user } = await getUserById(id)
        if (user.password === currentPassword) {

            const response = await instance.patch(`${endpoints.users}/${id}`, { password: newPassword })
            return {
                data: response.data,
                message: "password updated successfully!",
            }
        } else {
            return {
                data: null,
                message: "current password is incorrect!"
            }
        }
    }
    catch (error) {
        return {
            data: null,
            message: "password update failed!"
        }
    }
}
 

export async function updateInfo(id, updateInfo) {
    try {
        const response = await instance.patch(endpoints.users + `/${id}`, updateInfo)

        return {
            data: response.data,
            message: "user info updated successfully!",
        }
    }
    catch (error) {
        return {
            data: null,
            message: "user info update failed!"
        }
    }
}


export async function banUser(id, banMinutes) {
    try {
        const response = await instance.patch(endpoints.users + `/${id}`, {
            isBanned: true,
            banDate: new Date(Date.now() + banMinutes * 60 * 1000)
        })
        return {
            data: response.data,
            message: "user banned successfully!",
        }
    }
    catch (error) {
        return {
            data: null,
            message: "failed to ban user"
        }
    }
}
export async function unBanUser(id) {
    try {
        const response = await instance.patch(endpoints.users + `/${id}`, {
            isBanned: false,
            banDate: null
        })
        return {
            data: response.data,
            message: "user unbanned successfully!",
        }
    }
    catch (error) {
        return {
            data: null,
            message: "failed to unban user"
        }
    }
} 



export async function deleteUser (id) {

    try {
        const response = await instance.delete(`${endpoints.users}/${id}`);
       
      
        return {
            data: response.data,
            message: "user deleted successfully"
        }
    } catch (error) {
        return {
            data: null, 
            message: "failed to fetch user!"
        }
    }
}


export async function getAdmins() {
    try {
        const { data: users } = await getAllUsers();
        const admins = users.filter(user => user.role === "admin");

        return {
            data: admins,
            message: "Admins logged successfully",
        };
    } catch (error) {
        return {
            data: null,
            message: "Admin login failed!",
        };
    }
}


export async function adminLogin(email, password) {
    try {
        const { data: users } = await getAllUsers();
        const admin = users.find((u) => u.email === email && u.password === password && u.role === "admin");

        if (admin) {
            await instance.patch(endpoints.users + `/${admin.id}`, {
                lastLogin: new Date(),
            });

            return {
                data: admin,
                message: "Admin logged in successfully!",
            };
        } else {
            return {
                data: null,
                message: "You do not have admin access. Only admins can log in.",
            };
        }
    } catch (error) {
        return {
            data: null,
            message: "Admin login failed!",
        };}}