import Cookies from "js-cookie";

interface CookieOptions {
  expires?: number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  httpOnly?: boolean;
}

export function useCookie() {
  const setCookie = (name: string, value: string | number | any, options?: CookieOptions) => {
    Cookies.set(name, value, options);
  };

  const getCookie = (name: string) => {
    return Cookies.get(name);
  };

  const deleteCookie = (name: string) => {
    Cookies.remove(name);
  };

  return {
    setCookie,
    getCookie,
    deleteCookie
  };
}