import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/client";
import { useSettingsStore } from "@/features/settings/store/settings-store";

// 1. Login (The backend sets the cookie automatically)
export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      const formData = new URLSearchParams();
      formData.append("username", data.email);
      formData.append("password", data.password);

      // The response header will contain 'Set-Cookie'
      return await apiClient.post("/auth/jwt/login", formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
    },
  });
};

// 2. Fetch Current User (To check if logged in)
export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const { data } = await apiClient.get("/auth/users/me");
      useSettingsStore.getState().setUser(data);
      return data;
    },
    retry: false, // Don't retry if user is not logged in (401)
  });
};

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await apiClient.patch("/auth/users/me", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
};

// 3. Register (Expects JSON)
export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      // FastAPI-Users expects a JSON body for registration
      const response = await apiClient.post("/auth/register", data);
      return response.data;
    },
  });
};
