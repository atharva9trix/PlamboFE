import axios from "./http/axiosInstance";

const ENDPOINTS = {
  QUERY: "/query",
  QUERY_STREAM: "/query_stream",
  CLIENTS: "/clients",
  HEALTH: "/health",
  CREATE_SESSION: "/create_session", 
  FETCH_ATTRIBUTE: "/fetch_attribute/dtype/v1.0", 
  UPDATE_FILE_ATTRIBUTE: "/update_file_attribute/v1.0", 
  RENAME_COLUMN: "/update_col_dtype/v1.0", 
  UPDATE_COLUMN_TYPE: "/update_col_dtype/v1.0", 
  RUN_QUERY: "/run_query", 
  GET_INSIGHTS: "/get_insights", 
  CREATE: "/create",
  GET: "/get",
  GENERATE: "/generate",
  UPLOAD_KNOWLEDGEBASE: "/knowledgebase/data/upload/",
};


export async function checkApiHealth() {
  try {
    const res = await axios.get(ENDPOINTS.HEALTH);
    return res.data;
  } catch (err) {
    throw err;
  }
}


export async function sendQuery(clientId, query, opts = {}) {
  if (!clientId || String(clientId).trim() === "") {
    throw new Error("clientId is required");
  }
  if (!query || String(query).trim() === "") {
    throw new Error("query is required");
  }

  const payload = {
    client_id: clientId,
    query: String(query).trim(),
    conversation_context: opts.conversation_context || "",
  };

  try {
    const res = await axios.post(ENDPOINTS.QUERY, payload);
    return res.data;
  } catch (err) {
    const serverMessage =
      err?.response?.data?.message ||
      err?.response?.data?.detail ||
      (Array.isArray(err?.response?.data)
        ? JSON.stringify(err.response.data)
        : err.message);
    const e = new Error(serverMessage || "Failed to send query");
    e.original = err;
    throw e;
  }
}


export async function createSession(userId) {
  try {
    const res = await axios.get(
      `${ENDPOINTS.CREATE_SESSION}?user_id=${userId}`,
      {
        data: { user_id: userId.toString(), session_id: "1" },
      },
    );
    return res.data;
  } catch (err) {
    throw new Error("Failed to create session: " + (err.message || err));
  }
}


export async function fetchSchema(file, userId, sessionId) {
  if (!file) return;

  const sid = sessionId || "1"; 

  const formData = new FormData();
  formData.append("file", file);
  formData.append("user_id", String(userId));
  formData.append("session_id", String(sid));

  try {
    const response = await axios.post(ENDPOINTS.FETCH_ATTRIBUTE, formData);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Unknown error occurred while uploading.";
    throw new Error(message);
  }
}


export async function updateFileAttribute(file, userId, sessionId) {
  if (!file) return;

  const sid = sessionId || "1";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("user_id", String(userId));
  formData.append("session_id", String(sid));

  try {
    const response = await axios.post(
      ENDPOINTS.UPDATE_FILE_ATTRIBUTE,
      formData,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}


export async function renameColumn(fileName, userSessionFileId, renameCol) {
  return axios.post(ENDPOINTS.RENAME_COLUMN, {
    file_name: fileName,
    id: userSessionFileId,
    rename_col: renameCol,
  });
}


export async function updateColumnType(
  fileName,
  userSessionFileId,
  updateDtype,
) {
  return axios.post(ENDPOINTS.UPDATE_COLUMN_TYPE, {
    file_name: fileName,
    id: userSessionFileId,
    update_dtype: updateDtype,
  });
}


export async function runQuery(fileName, userId, sessionId, question) {
  try {
    const sid = sessionId || "1";

    const payload = new URLSearchParams();
    payload.append("file_name", fileName);
    payload.append("userid", String(userId));
    payload.append("sessionid", String(sid));
    payload.append("question", question);

    const response = await axios.post(ENDPOINTS.RUN_QUERY, payload, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}


export async function getInsights(runQueryResponse) {
  try {
    const response = await axios.post(ENDPOINTS.GET_INSIGHTS, {
      response_data: runQueryResponse,
    });
    return response.data;
  } catch (error) {
    return null;
  }
}



export async function createClient(name) {
  try {
    const res = await axios.post(`${ENDPOINTS.CREATE}?level=client`, {
      Client_Name: name,
    });
    return res.data;
  } catch (err) {
    throw new Error(
      err?.response?.data?.message ||
      err?.response?.data?.detail ||
      "Failed to create client"
    );
  }
}

export async function fetchClients() {
  try {
    const res = await axios.post(`${ENDPOINTS.GET}?level=client`,{
      Client_Name: "client4"}
    );
    const data = res.data;

    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.data)) return data.data;

    return [];
  } catch (err) {
    
    return [];
  }
}



export async function fetchProjects(selectedClient) {
  
  try {
    const res = await axios.post(
      `${ENDPOINTS.GET}?level=project`,{
      Client_Name: selectedClient}
    );

    const data = res.data;

    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.data)) return data.data;
    return [];
  } catch (err) {
    return [];
  }
}

export async function createProject(SelectedClient, name) {
  try {
    const res = await axios.post(
      `${ENDPOINTS.CREATE}?level=project`,
      {
        Project_Name: name,
        Client_Name: SelectedClient,
      }
    );

    return res.data;
  } catch (err) {
    throw new Error(
      err?.response?.data?.message ||
      err?.response?.data?.detail ||
      "Failed to create project"
    );
  }
}

export async function generateMedia(clientId, prompt, mediaType = "image") {
  if (!clientId) throw new Error("clientId is required");
  if (!prompt) throw new Error("prompt is required");

  const payload = {
    client_id: clientId,
    prompt: prompt.trim(),
    media_type: mediaType,
  };

  try {
    const res = await axios.post(
      ENDPOINTS.GENERATE,
      payload,
      mediaType === "content"
        ? {}
        : { responseType: "blob" }
    );

    if (mediaType === "content") {
      return res.data; 
    }

    return res.data; 
  } catch (err) {
    const message =
     "Failed to generate..."|| err?.response?.data?.message ||
      err?.response?.data?.detail ||
      err.message;

    throw new Error(message);
  }
}

export async function streamQuery(clientId, query, opts = {}, onChunk) {
  const payload = {
    client_id: { Client_Name: clientId },
    query: String(query).trim(),
    conversation_context: opts.conversation_context || "",
  };

  const response = await fetch(axios.defaults.baseURL + ENDPOINTS.QUERY_STREAM, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) throw new Error("Streaming failed");

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let fullText = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value, { stream: true });
    fullText += chunk;
    if (onChunk) onChunk(fullText);
  }
}

export async function uploadKnowledgeBase(file, clientId) {
  if (!file) throw new Error("File is required");
  if (!clientId) throw new Error("clientId is required");

  const formData = new FormData();
  formData.append("file", file);
  formData.append("client_id", clientId);

  try {
    const response = await axios.post(
      ENDPOINTS.UPLOAD_KNOWLEDGEBASE,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.detail ||
      error.message ||
      "Failed to upload knowledge base";

    throw new Error(message);
  }
}