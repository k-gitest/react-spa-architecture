/* PostgrestErrorをTRPCErrorとして返すマッピング処理 */
export const mapPostgrestErrorCodeToTRPCErrorCode = (code: string) => {
    switch (code) {
      case 'invalid_request':
        return 'BAD_REQUEST';
      case 'unauthorized':
        return 'UNAUTHORIZED';
      case 'forbidden':
        return 'FORBIDDEN';
      case 'not_found':
        return 'NOT_FOUND';
      case 'conflict':
        return 'BAD_REQUEST';
      case 'internal_server_error':
        return 'INTERNAL_SERVER_ERROR';
      case 'bad_gateway':
        return 'BAD_GATEWAY';
      case 'service_unavailable':
        return 'SERVICE_UNAVAILABLE';
      case 'gateway_timeout':
        return 'GATEWAY_TIMEOUT';
      default:
        return 'INTERNAL_SERVER_ERROR';
    }
  };
