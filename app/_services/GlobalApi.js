
import request, { gql } from "graphql-request";
import React from "react";
import { toast } from "sonner";



const MASTER_URL=process.env.NEXT_PUBLIC_APP_HYGRAPH_URL;

const getAllCourcesList=async()=>{
    const query=gql`
    query Assets {
        courceLists(first: 20, orderBy: createdAt_DESC){
          auther
          name
          id
          free
          description
          demoUrl
          banner {
            url
          }
          chapter {
            ... on Chapter {
              id
              name
              video {
                url
              }
            }
          }
          sourceCode
          tag
          slug
          totalChapters
        }
      }`
    const result=await request(MASTER_URL,query);
    return result;


}
const getSideBanner=async()=>{
        const query=gql`
        query Getbanners {
          sideBanners {
            id
            name
            banner {
              url
              id
            }
            url
          }
        }

        `
        const result=await request(MASTER_URL,query);
        return result;
}

    const getCourceById=async(courceid)=>{
      const query=gql`
      query Assets {
        courceLists(
          first: 20
          orderBy: createdAt_DESC
          where: {slug: "`+courceid+`"}
        ) {
          auther
          name
          id
          free
          description
          demoUrl
          banner {
            url
          }
          chapter {
            ... on Chapter {
              id
              name
              video {
                url
              }
            }
          }
          sourceCode
          tag
          totalChapters
          slug
        }
      }
      `
      const result=await request(MASTER_URL,query);
      return result;
    }

    const enrolltocource=async(id,email)=>{
      console.log(id,email)
      const query=gql`
      mutation MyMutation {
        createUserEnrollCource(
          data: {courceId: "`+id+`", userEmail: "`+email+`", courceList: {connect: {slug: "`+id+`"}}}
        ) {
          id
        }
        publishManyUserEnrollCourcesConnection(where: {userEmail: "`+email+`"})  {
          edges {
            node {
              id
            }
          }
        }
      }
      `
      const result=await request(MASTER_URL,query);
      return result;
    }

    const checkEnrolledtoCource=async(courceId,email)=>{
      const query=gql`
      query MyQuery {
        userEnrollCources(where: {courceId:"`+courceId+`", userEmail:"`+email+`"}) {
          id
        }
      }
      `
      const result=await request(MASTER_URL,query);
      return result;
    }
    const getUserEnrollCource=async(id,email)=>{
       const query=gql`query MyQuery {
        userEnrollCources(first: 20, orderBy: createdAt_DESC
          where: {id: "`+id+`", userEmail: "`+email+`"}
        ) {
          courceId
          id
          userEmail
          completedChapter {
            ... on CompletedChapter {
              id
              chapterId
            }
          }
          courceList {
            auther
            banner {
              url
            }
            chapter {
              ... on Chapter {
                id
                name
                shortDesc
                video {
                  url
                }
              }
            }
            demoUrl
            description
            free
            id
            name
            slug
            sourceCode
            totalChapters
          }
        }
      }
      `
      const result=await request(MASTER_URL,query);
      return result;
    }
    const markcompletedchapter=async(enrollId,chapterid)=>{
      const query=gql`mutation MyMutation {
        updateUserEnrollCource(
          data: {completedChapter: {create: {CompletedChapter: {data: {chapterId: "`+chapterid+`"}}}}}
          where: {id: "`+enrollId+`"}

        )
        {
          id
        }
        publishUserEnrollCource(where: {id: "`+enrollId+`"}) {
          id
        }
      }
      
     `
     const result=await request(MASTER_URL,query);
     return result;
   
   }

 const getAllUserEnrolledCources=async(id)=>{
  const query=gql`
  query MyQuery {
    userEnrollCources(where: {userEmail: "`+id+`"}) {
      completedChapter {
        ... on CompletedChapter {
          id
          chapterId
        }
      }
      courceId
      courceList {
        name
        id
        totalChapters
        slug
        sourceCode
        free
        description
        demoUrl
        chapter(first: 50){
          ... on Chapter {
            id
            name
          }
        }
        auther
        banner {
          url
        }
      }
    }
}
  `
  const result =request(MASTER_URL,query);
  return result
 }

 const Addnewmember=async(email,id)=>{
  const query=gql`
  mutation MyMutation {
    createMembership(
      data: {active: true, email: "`+email+`", paymentId: "`+id+`"}
    ) {
      id
    
    }
    publishManyMemberships(to: PUBLISHED) {
      count
    }
  }
  `
  const result=await request(MASTER_URL,query);
  return result;
}

const Checkformembership=async(email)=>{
  const query=gql`
  query MyQuery {
    memberships(where: {email: "`+email+`"}) {
      createdAt
      active
      id
      paymentId
    }
  }
  `
  const result=await request(MASTER_URL,query);
  return result;
}


const NewletterUpdates=async(email)=>{
  const query=gql`
  query MyQuery {
    newsletters {
      date
      description
      id
      meeting
      topic
      image {
        url
      }
      author
    }
  }
  `
  const result=await request(MASTER_URL,query);
  return result;
}

export default{
    getAllCourcesList,
    getSideBanner,
    getCourceById,
    enrolltocource,
    checkEnrolledtoCource,
    getUserEnrollCource,
    markcompletedchapter,
    getAllUserEnrolledCources,
    Addnewmember,
    Checkformembership,
    NewletterUpdates
}