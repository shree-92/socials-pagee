class ApiResponse {
    constructor(stausCode, data, message = "maybe success"){
        this.stausCode = stausCode
        this.data = data
        this.message = message
        this.success = stausCode < 400
    }
}

export {ApiResponse}

// example of using api response

// new ApiResponse(200,{user: loggedInUser, accessToken, refreshToken},"user logged in") 