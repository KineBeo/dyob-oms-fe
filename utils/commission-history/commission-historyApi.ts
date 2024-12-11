import api from "../config";

export const commissionHistoryService = {
    async getAllCommissionHistory() {
        try {
            const response = await api.get(`/commission-history`)
            return response.data;
        } catch (error) {
            console.error(error)
        }
     }, 

     async getCommissionHistoryByUserStatusId(user_statusId: number) {
        try {
            const response = await api.get(`/commission-history/${user_statusId}`);
            return response.data;
        } catch (error) {
            console.error(error)
        }
     }
};
