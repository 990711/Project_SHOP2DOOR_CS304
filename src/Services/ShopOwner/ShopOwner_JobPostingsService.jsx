import axios from 'axios';

const JOB_POSTINGS_API_BASE_URL = "http://localhost:8080/api/v1/ShopOwnerJob";

class ShopOwner_JobPostingsService{
    getJobPostings(){
        return axios.get(JOB_POSTINGS_API_BASE_URL);

    }
    createJobPostings(jobPostings){
        return axios.post(JOB_POSTINGS_API_BASE_URL, jobPostings);
    }

    getJobPostingsById(jobPostingsId){
        return axios.get(JOB_POSTINGS_API_BASE_URL +'/' + jobPostingsId);

    }

    updateJobPostings(jobPostings){
        return axios.put(JOB_POSTINGS_API_BASE_URL +'/' + jobPostings.id, jobPostings);

    }

    deleteJobPostings(jobPostingsId){
        return axios.delete(JOB_POSTINGS_API_BASE_URL +'/' + jobPostingsId);

    }

}
export default new ShopOwner_JobPostingsService()