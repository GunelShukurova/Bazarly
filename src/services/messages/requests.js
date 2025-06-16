import instance from "../instance";
import { endpoints } from "../../constants";


export async function getAllMessages() {
    try {
        const response = await instance.get(endpoints.messages)
        return {
            data: response.data,
            message: "messages received successfully"
        }
    } catch (error) {
        return {
            data: null, 
            message: "failed to fetch messages!"
        }
    }
}

export async function getMessageById(id) {
    try {
        const response =await instance.get(endpoints.messages + `/${id}`)
        return {
            data: response.data,
            message: "message received successfully"
        }
    } catch (error) {
        return {
            data: null, 
            message: "failed to fetch message!"
        }
    }
}

export async function postMessage (newMessage)
 {
    try {
        const response =await instance.post(endpoints.messages, newMessage)
        return {
            data: response.data,
            message: "message item posted successfully"
        }
    } catch (error) {
        return {
            data: null, 
            message: "failed to post message!"
        }
    }
}

export async function toggleIsRead (id) {
    try {
        const message= await getMessageById(id)
        const response =await instance.patch(endpoints.messages + `/${id}`,{
            isRead: !message.data.isRead}
          
     
        )
        return {
            data: response.data,
            message: "message updated successfully"
        }
    } catch (error) {
        return {
            data: null, 
            message: "failed to update message!"
        }
    }
}

export async function deleteMessage  (id) {

    try {
        const response =await instance.delete(endpoints.messages + `/${id}`
       
        )
        return {
            data: response.data,
            message: "message deleted successfully"
        }
    } catch (error) {
        return {
            data: null, 
            message: "failed to delete message!"
        }
    }
}

export async function updateContactIsRead(id, isRead) {
  try {
    const response = await instance.patch(`${endpoints.messages}/${id}`, { isRead });
    return {
      data: response.data,
      message: "message updated successfully"
    };
  } catch (error) {
    return {
      data: null,
      message: "failed to update message"
    };
  }
}