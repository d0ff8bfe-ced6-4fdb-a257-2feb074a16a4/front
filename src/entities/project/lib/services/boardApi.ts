import { IProject } from '@entities/project';
import mainApi from '@shared/lib/store/mainApi.ts';
import { IBoard } from '@widgets/ui/Canban/lib';

export const boardApi = mainApi.injectEndpoints({
    endpoints: (build) => ({
        createBoard: build.mutation({
            query: (board) => ({
                url: '/board',
                method: 'POST',
                body: board,
            }),
        }),
        // findOneProject: build.query<IProject, string>({
        //     query: (id: string) => ({
        //         url: `/project/${id}`,
        //         method: 'GET',
        //     }),
        // }),
        // getAllProjects: build.query({
        //     query: () => ({
        //         url: '/project',
        //         method: 'GET',
        //     }),
        //     transformResponse: (response: IProject[]) => {
        //         return response.map((item: IProject) => {
        //             return {
        //                 label: item.title,
        //                 value: item.id,
        //             };
        //         });
        //     },
        // }),
    }),
});

export const { useCreateBoardMutation } = boardApi;