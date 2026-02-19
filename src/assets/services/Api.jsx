import { BASE_URL, JOBS_URL, CANDIDATE_URL, APPLY_URL } from "../Config";

export const getJobs = () => {
  return fetch(`${BASE_URL}${JOBS_URL}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  }).then(res => res.json());
};

export const getCandidateByEmail = (email) => {
  return fetch(`${BASE_URL}${CANDIDATE_URL}${email}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  }).then(res => res.json());
};

export const applyToJob = (candidate, jobId, repoUrl) => {
  return fetch(`${BASE_URL}${APPLY_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      uuid: candidate.uuid,
      jobId: jobId,
      candidateId: candidate.candidateId,
      repoUrl: repoUrl
    })
  }).then(res => res.json());
};
