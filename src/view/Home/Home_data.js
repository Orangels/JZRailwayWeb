import {randomNum} from "../../common/utils";

export let Home_data = {
    class_statistical:{
        title:'设备概览',
        text_content:[
            ['布控位置', '大厅门 1'],
            ['进入人数', 10],
            ['离开人数', 2],
            ['在线人员', 9],
            ['陌生人',  1],
        ],
        // tabValue:['枪机 1','枪机 2','枪机 3','枪机 4', '枪机 5',],
        tabValue:['枪机 0','枪机 1','枪机 2'],
        interactive_state:48,
        focus_state: 49,
        active_state:56,

    },
    device_states:{
        title:'设备概览',
        text_content:[
            [5, '边缘端部署'],
            ['100%','设备正常率'],
            ['2033M', '平均内存占用'],
            ['3000M', '最大内存占用'],
            ['123h', '运行时长'],
            // [75, '设备温度'],
            [64, '网络延迟'],
        ],
        wave_params:[
            ['枪机1在线', '', 95],
            ['鱼眼1 在线', '', 95],
            ['鱼眼2 在线', '', 95],
            ['枪机1运行时长', '124h', 60],
            ['鱼眼1运行时长', '124h', 60],
            ['鱼眼2运行时长', '124h', 60]
        ]
    },
    preview_data:{
        title:'进出人员统计',
        text_content:[
            {
                title:'进入人数',
                text_1:56,
                text_2:7,
            },
            {
                title:'离开人数',
                text_1:48,
                text_2:6,
            },
            {
                title:'1 号区域人数',
                text_1:16,
                text_2:2,
            },
            {
                title:'2 号区域人数',
                text_1:24,
                text_2:3,
            },
            // {
            //     title:'回答问题',
            //     text_1:84,
            //     text_2:1.8,
            // },
            // {
            //     title:'玩手机',
            //     text_1:2,
            //     text_2:0.2,
            // },
            // {
            //     title:'讨论',
            //     text_1:16,
            //     text_2:1.8,
            // },
            // {
            //     title:'趴桌子',
            //     text_1:5,
            //     text_2:0.5,
            // },
            // {
            //     title:'阅读',
            //     text_1:39,
            //     text_2:1.8,
            // },
        ]
    },
    center_content:[
        [['部署班级','分析学生人数','分析教师人数','平均互动度'],
        [25,240,26,68],],
        [['授课次数','学情分析时长','平均专注度','平均活跃度'],
        [233,'2408h',87,90]],
    ]
}

export let home_content_2_1_data = [
    {
        time: "8:00",
        state_type: "区域 1",
        state: 0
    },
    // {
    //     time: "8:00",
    //     state_type: "区域 2",
    //     state: 0
    // },
    {
        time: "8:05",
        state_type: "区域 1",
        state: 0
    },
    // {
    //     time: "8:05",
    //     state_type: "区域 2",
    //     state: 0
    // },
    {
        time: "8:10",
        state_type: "区域 1",
        state: 0
    },
    // {
    //     time: "8:10",
    //     state_type: "区域 2",
    //     state: 0
    // },
    {
        time: "8:15",
        state_type: "区域 1",
        state: 0
    },
    // {
    //     time: "8:15",
    //     state_type: "区域 2",
    //     state: 0
    // },
    {
        time: "8:20",
        state_type: "区域 1",
        state: 0
    },
    // {
    //     time: "8:20",
    //     state_type: "区域 2",
    //     state: 0
    // },
    {
        time: "8:25",
        state_type: "区域 1",
        state: 0
    },
    // {
    //     time: "8:25",
    //     state_type: "区域 2",
    //     state: 0
    // },
    {
        time: "8:30",
        state_type: "区域 1",
        state: 0
    },
    // {
    //     time: "8:30",
    //     state_type: "区域 2",
    //     state: 0
    // },
]

export let home_content_2_1_pie_data = [
    {
        item: "0-10s",
        count: 0
    },
    {
        item: "10-20s",
        count: 0
    },
    {
        item: "20-30s",
        count: 0
    },
    {
        item: ">30s",
        count: 0
    },
];

export let home_content_1_3_data = [
    {
        time: "8:00",
        state_type: "进入人数",
        state: 0
        // state: 0
    },
    {
        time: "8:05",
        state_type: "进入人数",
        state: 0
        // state: 0
    },
    {
        time: "8:10",
        state_type: "进入人数",
        state: 0
        // state: 0
    },
    {
        time: "8:15",
        state_type: "进入人数",
        state: 0
        // state: 0
    },
    {
        time: "8:20",
        state_type: "进入人数",
        state: 0
        // state: 0
    },
    {
        time: "8:25",
        state_type: "进入人数",
        state: 0
        // state: 0
    },
    {
        time: "8:30",
        state_type: "进入人数",
        state: 0
        // state: 0
    },
]
export let home_content_2_2_data = [
    {
        country: "实时旅客人数",
        time: "8:00",
        // timeValue: 1593000000,
        value: 0
    },
    {
        country: "实时旅客人数",
        time: "8:30",
        // timeValue: 1593001800,
        value: 0
    },
    {
        country: "实时旅客人数",
        time: "9:00",
        // timeValue: 1593003600,
        value: 0
    },
    {
        country: "实时旅客人数",
        time: "9:30",
        // timeValue: 1593005400,
        value: 0
    },
    {
        country: "实时旅客人数",
        time: "10:00",
        // timeValue: 1593007200,
        value: 0
    },
    {
        country: "实时旅客人数",
        time: "10:30",
        // timeValue: 1593012600,
        value: 0
    },
    {
        country: "实时旅客人数",
        time: "11:00",
        // timeValue: 1592928000,
        value: 0
    },
    {
        country: "历史平均旅客人数",
        time: "8:00",
        // timeValue: 1593000000,
        value: 100
    },
    {
        country: "历史平均旅客人数",
        time: "8:30",
        // timeValue: 1593001800,
        value: 98
    },
    {
        country: "历史平均旅客人数",
        time: "9:00",
        // timeValue: 1593003600,
        value: 110
    },
    {
        country: "历史平均旅客人数",
        time: "9:30",
        // timeValue: 1593005400,
        value: 130
    },
    {
        country: "历史平均旅客人数",
        time: "10:00",
        // timeValue: 1593007200,
        value: 120
    },
    {
        country: "历史平均旅客人数",
        time: "10:30",
        // timeValue: 1593012600,
        value: 135
    },
    {
        country: "历史平均旅客人数",
        time: "11:00",
        // timeValue: 1592928000,
        value: 125
    },
];

export let home_content_2_1_pie_data_interval = 10 * 8