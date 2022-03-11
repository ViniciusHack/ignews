import { query as q } from 'faunadb'
import NextAuth from 'next-auth'
import GithubProvider from "next-auth/providers/github"
import { fauna } from '../../../services/fauna'


export default NextAuth({
  providers: [
      GithubProvider({
          clientId: process.env.GITHUB_CLIENT_ID,
          clientSecret: process.env.GITHUB_CLIENT_,
          authorization: {
              params: {
                  scope: 'read:user, user:email'
              }
          },
      }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        const { email } = user;
                  
        await fauna.query(
          q.Create(
            q.Collection('users'),
            { data: {email}}
          )
        )
      
        return true;
      } catch(err) {
        console.log(err)
        return false
      }
  },
}})