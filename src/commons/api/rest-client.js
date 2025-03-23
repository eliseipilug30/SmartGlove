function performRequest(request, callback) {
    fetch(request)
        .then((response) => {
            const contentType = response.headers.get("content-type");

            if (response.ok) {
                if (contentType && contentType.includes("application/json")) {
                    response.json().then((json) => callback(json, response.status, null));
                } else {
                    // Handle cases where response is ok but not JSON
                    callback(null, response.status, { message: "Response is not in JSON format" });
                }
            } else {
                if (contentType && contentType.includes("application/json")) {
                    response.json().then((err) => callback(null, response.status, err));
                } else {
                    // Handle non-JSON error responses
                    callback(null, response.status, { message: "An error occurred, but the response is not JSON." });
                }
            }
        })
        .catch((err) => {
            // Catch any other unexpected error
            callback(null, 1, err);
        });
}

module.exports = {
    performRequest,
};
