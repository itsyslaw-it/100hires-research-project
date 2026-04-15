import { Supadata } from "@supadata/js";
  
  // Initialize the client
  const supadata = new Supadata({
    apiKey: "sd_f2f1d4ef3bbe833b80330ce76c89f304",
  });
  
  // Get transcript from any supported platform (YouTube, TikTok, Instagram, X (Twitter)) or file
  const transcriptResult = await supadata.transcript({
    url: "https://www.youtube.com/watch?v=kCIz_-JSAJw",
    lang: "en", // optional
    text: true, // optional: return plain text instead of timestamped chunks
    mode: "auto", // optional: 'native', 'auto', or 'generate'
  });
  
  // Check if we got a transcript directly or a job ID for async processing
  if ("jobId" in transcriptResult) {
    // For large files, we get a job ID and need to poll for results
    console.log(`Started transcript job: ${transcriptResult.jobId}`);
  
    // Poll for job status
    const jobResult = await supadata.transcript.getJobStatus(
      transcriptResult.jobId
    );
    if (jobResult.status === "completed") {
      console.log("Transcript:", jobResult.content);
    } else if (jobResult.status === "failed") {
      console.error("Transcript failed:", jobResult.error);
    } else {
      console.log("Job status:", jobResult.status); // 'queued' or 'active'
    }
  } else {
    // For smaller files, we get the transcript directly
    console.log("Transcript:", transcriptResult);
  }