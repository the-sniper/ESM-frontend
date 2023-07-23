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
    console.log(data, from, this.RESPONSE_STATUS, "checkCommon");
    if (data && data.message && data.message == "SUCCESS") {
      this.dispatch({
        type: this.RESPONSE_STATUS,
        payload: {
          status: "SUCCESS",
          message: data.statusText || "Request processed successfully!",
          type: data.data.responseType,
          data: data,
          from: from,
        },
      });
    } else if (data && data.status && data.status == 200) {
      this.dispatch({
        type: this.RESPONSE_STATUS,
        payload: {
          status: "SUCCESS",
          message: data.statusText || "Request processed successfully!",
          type: data.data.responseType,
          data: data,
          from: from,
        },
      });
    } else if (data && data.message && data.message === "ERROR") {
      this.dispatch({
        type: this.RESPONSE_STATUS,
        payload: {
          status: "error",
          message: data.statusText || "Request failed!",
          type: data.data.responseType,
          from: from,
        },
      });
    } else {
      this.commonErrorResponse(from);
    }
  }
}
