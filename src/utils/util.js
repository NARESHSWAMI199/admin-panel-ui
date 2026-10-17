
const ip = 'localhost'
const port = '8080'
export const host = `http://${ip}:${port}`

export const updateObject = (state, updatedObject) => {
    return {
        ...state,
        ...updatedObject
    }
}

export const toTitleCase = (str) => {
    if (!!str)
    return str.replace(
      /\w\S*/g,
      text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    );
    return "____"
  }


  export  const itemImage = host+"/admin/item/image/";
  export const storeImage = host+"/admin/store/image/"
  export const userImage = host+"/admin/auth/profile/"


  export const suId = 1;
  export const projectName= "Swami Sales";
  export const rowsPerPageOptions=[10, 25 , 50]
  export const ruppeeIcon = "₹";
  export const firebaseConfig = {
    apiKey: "AIzaSyDus6j9avh8dbIHgGxzdZGbGwud5UbGDy4",
    authDomain: "push-notifications-fd978.firebaseapp.com",
    projectId: "push-notifications-fd978",
    storageBucket: "push-notifications-fd978.firebasestorage.app",
    messagingSenderId: "895756161037",
    appId: "1:895756161037:web:82cccfdb045c0ac7ae4544",
    measurementId: "G-SBLDLG9L7D",
  };
  export const VAPID_PUBLIC_KEY = "BLIFnA1FU1D1Ua58AaycAI_7OQ4O5irMO9clnHuZ8CSC2lj8lUSIkdAinSfi84Rs3oo7ok6W4rcEB2_zsYNQsV0"
  