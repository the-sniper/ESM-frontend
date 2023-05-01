export class response {
  constructor(dispatch, RESPONSE_STATUS) {
    this.dispatch = dispatch;
    this.RESPONSE_STATUS = RESPONSE_STATUS;
  }

  async commonErrorResponse(from) {
    this.dispatch({
      type: this.RESPONSE_STATUS,
      payload: {
        status: "error",
        message: "Something went wrong!",
        type: 0,
        from: from,
      },
    });
  }

  async commonResponse(data, from) {
    if (data && data.status && data.status === "success") {
      this.dispatch({
        type: this.RESPONSE_STATUS,
        payload: {
          status: data.status,
          message: data.data.message,
          type: data.data.responseType,
          data: data.data.responseData,
          from: from,
        },
      });
    } else if (data && data.status && data.status === "error") {
      this.dispatch({
        type: this.RESPONSE_STATUS,
        payload: {
          status: data.status,
          message: data.data.message,
          type: data.data.responseType,
          from: from,
        },
      });
    } else {
      this.commonErrorResponse(from);
    }
  }
}
