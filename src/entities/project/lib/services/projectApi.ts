import { IProject } from '@entities/project';
import mainApi from '@shared/lib/store/mainApi.ts';

export const projectApi = mainApi.injectEndpoints({
    endpoints: (build) => ({
        createProject: build.mutation<void, IProject>({
            query: (project) => ({
                url: '/project',
                method: 'POST',
                body: project,
            }),
        }),
        findOneProject: build.query<IProject, string>({
            query: (id: string) => ({
                url: `/project/${id}`,
                method: 'GET',
            }),
        }),
        getAllProjects: build.query({
            query: () => ({
                url: '/project',
                method: 'GET',
            }),
            transformResponse: (response: IProject[]) => {
                return response.map((item: IProject) => {
                    return {
                        label: item.title,
                        value: item.id,
                    };
                });
            },
        }),
    }),
});

export const { useCreateProjectMutation, useGetAllProjectsQuery, useLazyFindOneProjectQuery } = projectApi;