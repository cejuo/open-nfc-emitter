import { io } from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const LOGIN_SUCCESFUL = "LOGIN_SUCCESFUL";

export const login = (
  email: string | null,
  password: string | undefined,
  session: string | null,
  isSignup: boolean
) => {
  return async (dispatch: any, getState: any) => {
    return new Promise((resolve, reject) => {
      console.log("login");
      const socket = getState().socketStore;

      if (!socket.isConnected) throw new Error("Not connected");

      var query = isSignup ? "user:signup" : "user:login";
      socket.socket.emit(query, { email: email, password: password, session: session }, (response: any) => {
        console.log("login response:", response);
        if (response.ok) {
          //@ts-ignore
          AsyncStorage.setItem("email", email);
          AsyncStorage.setItem("session", response.session);
          AsyncStorage.setItem("userId", response.userId);
        }
        dispatch({
          type: LOGIN_SUCCESFUL,
          userId: response.userId,
          email: email,
          session: response.session,
          tokens: response.tokens,
        });
        resolve(response);
      });
    });
  };
};

export const reload = (navigation: any) => {
  return async (dispatch: any, getState: any) => {
    return new Promise((resolve, reject) => {
      console.log("reload");
      const socket = getState().socketStore;

      if (!socket.isConnected) throw new Error("Not connected");

      socket.socket.on("reload", async () => {
        console.log("RELOAD");
        try {
          const email = await AsyncStorage.getItem("email");
          const session = await AsyncStorage.getItem("session");
          const userId = await AsyncStorage.getItem("userId");

          await dispatch(login(email, undefined, session, false));
          navigation.navigate("Tokens", { a: "" });
        } catch (err) {
          console.log(err);
        }
      });
    });
  };
};
