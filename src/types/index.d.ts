export namespace AppTypes {
     export type Status = 'Public' | 'Private';
     export type Point = 3 | 5 | 7 | 10;
     export type Category = "All" | "Academic" | "Volunteer" | "Mental Physical"
     export interface Faculty {
          name: string;
          value: string;
     }
     export interface LoginRequest {
          email: string;
          password: string;
     }
     export interface LoginResponse {
          role?: AppTypes.User.role;
          token: {
               accessToken: string;  
          };
     }
     export interface EmailRequest {
          email: string;
     }
     export interface CreatePostRequest {
          name: string;
          desc: string;
          facultyName: string;
          status: Status;
          startAt: number;
          endAt: number;
          location: string;
          point: Point;
          numberParticipants: number;
          category: Category;
          semester: string;
     }
     export interface CreateTestRequest {
          questions: Question[];
          target: number;
     }
     export interface ChangePasswordRequest {
          id?: string;
          currentPassword: string;
          newPassword: string;
     }
     export interface ResetPasswordRequest{
          token: string;
          password: string;
     }
     export interface JoinPostRequest{
          studentId: string;
          postId: string;
     }
     export interface Post {
          id: string;
          name: string;
          desc: string;
          status: Status;
          startAt: number;
          endAt: number;
          location: string;
          numberParticipants: number;
          facultyName: string;
          category: Category;
          point: Point;
          stdJoin?: string[];
          testId?: string;
          semester: string;
          yearStart: number;
          yearEnd: number;
     }
     
     export type PointDetail = {
          name: string;
          point: number;
     }
     export interface PointCategory{
          studentId: string;
          academic: PointDetail[];
          totalAcademic: number;
          volunteer: PointDetail[];
          totalVolunteer: number;
          mentalPhysical: PointDetail[];
          totalMentalPhysical: number;
          discipline: PointDetail[];
          reward: PointDetail[];
          totalReward: number;
          pioneering: PointDetail[];
          totalPioneering: number;
          totalPoints: number;
     }
     export interface User {
          id: string;
          email: string;
          name: string;
          role: string;
          facultyName: string;
          trainingPoint: PointCategory
          activities: string[];
     }
     export interface Test {
          testId: string;
          questions: Question[];
          target: number;
     }
     export interface Question{
          question: string;
          options: Options[];
          correctOption: string;
     }
     export interface Options{
          id: string;
          text: string;
     }
     export interface UpdatedPostData{
          name: string;
          desc: string;
          endDate: string;
          endTime: string;
          numberParticipants: number;
     }
     export interface UpdatedTestData{
          questions: Question[];
          target: number;
     }
     export interface UpdatePostRequest{
          postId: string;
          updatedPostData: UpdatedPostData;
          updatedTestData: UpdatedTestData;
          location: string;
     }


     ////
       export interface OptionV2{
          id: string;
          text: string;
          label: string;
     }
     export interface QuestionV2{
          id: string;
          text: string;
          options: OptionV2[];
          correctOption: OptionV2;
     }
     export interface PostV2 {
          id: string;
          title: string;
          description: string;
          image?: string;
          dateStart: number;
          dateEnd: number;
          points: number;
          status: Status;
          location: string;
          tags: string[]      
          category: Category;
          students_joined?: string[];
          total_students?: number;
          semester: string;
     }
     export interface TestV2{
          id: string;
          title: string;
          description: string;
          image?: string;
          dateStart: number;
          dateEnd: number;
          points: number;
          status: Status;
          location: string;
          tags: string[];
          category: Category;
          students_joined?: string[];
          total_students?: number;
          semester: string;
          questions: QuestionV2[];
     }
     export interface Activities {   
          id: number;
          name: string;
          date: string;
          points: number;
     }
     export interface Activity {
          id: number;
          name: string;
          total_points: number;
          activities: Activities[];
     }
     export interface Student {
          id: string;
          name: string;
          email: string;
          phone: string;
          department: string;
          totalActivities: number;
          totalPoints: number;
          joinDate: string;
          categories: Activity[];
     }
   
}