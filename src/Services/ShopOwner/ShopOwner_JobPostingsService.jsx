import axios from 'axios';

const JOB_POSTINGS_API_BASE_URL = "http://localhost:8080/api/v1/shopowner_jobpostings";
const ShopOwnerclosejob = "http://localhost:8080/api/v1/ShopOwnerclosejob";
const ShopOwneropenjob = "http://localhost:8080/api/v1/ShopOwneropenjob";

class ShopOwner_JobPostingsService{
    getJobPostings(){
        return axios.get(JOB_POSTINGS_API_BASE_URL);

    }
    createJobPostings(ShopUserName, jobPostings){
        return axios.put(`http://localhost:8080/api/v1/ShopOwnerJob/${ShopUserName}`, jobPostings);
    }

    getJobPostingsByShopUserName(ShopUserName) {
        return axios.get(`http://localhost:8080/api/v1/getJobsDetailsofShopOwner/${ShopUserName}`);
    }

    getJobCandidates(ShopUserName) {
        return axios.get(`http://localhost:8080/api/v1/ShopOwnerJobCandidates/${ShopUserName}`);
    }

    getJobPostingsById(jobPostingsId){
        return axios.get(JOB_POSTINGS_API_BASE_URL +'/' + jobPostingsId);

    }

    updateJobPostings(jobPostings){
        return axios.put(JOB_POSTINGS_API_BASE_URL +'/' + jobPostings.id, jobPostings);

    }

    closeJobPostings(jobPostings) {
        return axios.get(ShopOwnerclosejob +'/' + jobPostings.id, jobPostings);
    }

    reopenJobPostings(jobPostings) {
        return axios.get(ShopOwneropenjob +'/' + jobPostings.id, jobPostings);
    }

    
    
    
    

    deleteJobPostings(jobPostingsId){
        return axios.delete(JOB_POSTINGS_API_BASE_URL +'/' + jobPostingsId);

    }

}
export default new ShopOwner_JobPostingsService()