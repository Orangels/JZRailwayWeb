export let focus_state = [
    {
        item: "非常专注",
        count: 49
    },
    {
        item: "非常不专注",
        count: 21
    },
    {
        item: "正常专注",
        count: 17
    },
    {
        item: "比较专注",
        count: 13
    },
];

export let active_state = [
    {
        item: "非常活跃",
        count: 30
    },
    {
        item: "非常不活跃",
        count: 20
    },
    {
        item: "正常活跃",
        count: 27
    },
    {
        item: "比较活跃",
        count: 23
    },
];


export let interactive_state = [
    {
        item: "非常互动",
        count: 35
    },
    {
        item: "非常不互动",
        count: 15
    },
    {
        item: "正常互动",
        count: 24
    },
    {
        item: "比较互动",
        count: 26
    },
];

// export const state_data = {
//     data:{
//         class_RT_state:{
//             focus_state:[],
//             active_state:[],
//             interactive_state:[]
//         },
//         class_mean_state:{
//             focus_state:[],
//             active_state:[],
//             interactive_state:[]
//         },
//         course_mean_state:{
//             focus_state:[],
//             active_state:[],
//             interactive_state:[]
//         }
//     },
//     // keys:["兴趣度","活跃度","互动率"]
// };


export const state_data = {
    data:{
        class_RT_state:{
            focus_state:[10,20,30,40],
            active_state:[20,30,40,50],
            interactive_state:[30,40,50,60]
        },
        class_mean_state:{
            focus_state:[5,15,25,35],
            active_state:[15,25,35,45],
            interactive_state:[23,35,45,55]
        },
        course_mean_state:{
            focus_state:[15,25,35,45],
            active_state:[25,35,45,55],
            interactive_state:[34,45,55,65]
        }
    },
    // keys:["兴趣度","活跃度","互动率"]
};

export const chart_color = ['#2584E3', '#36AA5E', '#DAB43A', '#27ABB1']