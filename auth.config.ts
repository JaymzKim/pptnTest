import type { NextAuthConfig } from 'next-auth';
import { User } from '@/lib/definitions';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: "jwt",
  },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      // 유저 인증 확인
      const isLoggedIn = !!auth?.user;
      // 보호하고 싶은 경로 설정
      // 여기서는 /login 경로를 제외한 모든 경로가 보호 되었다
      const isOnProtected = !(nextUrl.pathname.startsWith('/login') || nextUrl.pathname.startsWith('/public'));
      
      if (isOnProtected) {
        if (isLoggedIn) return true;
        return false; // '/login' 경로로 강제이동
      } else if (isLoggedIn) {
        // 홈페이지로 이동
        console.log("fdfd",auth);
        return Response.redirect(new URL('/', nextUrl));
      }
      return true;
    },
    jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    session(sessionArgs) {
     // token only exists when the strategy is jwt and not database, so sessionArgs here will be { session, token }
     // with a database strategy it would be { session, user } 
     if ("token" in sessionArgs) {
        let session = sessionArgs.session;
        if ("user" in sessionArgs.token) {
          const tokenUser = sessionArgs.token.user as User;
          if (tokenUser.id) {
            session.user.id = tokenUser.id;
            return session;
          }
        }
     }
     return sessionArgs.session;
    },
  },
} satisfies NextAuthConfig;