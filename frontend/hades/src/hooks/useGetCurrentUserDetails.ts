import axios from "axios";
import { useEffect, useState } from "react";
import { endpoints } from "../routes/routes";
import { FetchedData } from "../types/fetchedData";
import { ErrorResponse, UserDetailsResponse } from "../types/responses";
import { UserDetails } from "../types/user";
import { emptyCurrentUser } from "../utils/emptyUser";
import { getToken } from "../utils/token/getToken";

export const useGetCurrentUserDetails = (): FetchedData<UserDetails> => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<UserDetails>(emptyCurrentUser);

  const token = getToken();

  useEffect(() => {
    setIsLoading(true);
    axios.post(endpoints.verify, { token })
      .then((response: UserDetailsResponse) => {
        setCurrentUser(response.data.user);
        setIsLoading(false);
      })
      .catch((error: ErrorResponse) => {
        setError(error.response.data);
        setIsLoading(false);
      });
  }, [token]);

  return {
    data: currentUser,
    loading: isLoading,
    error,
  }
};