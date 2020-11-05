import {url} from "../../common/urls";

export let cameraParams = {
    camera : [
        {
            counting : {
                online : false,
                params : [
                    {
                        direction : [
                            {
                                x : 0.677,
                                y : 0.579
                            },
                            {
                                x : 0.932,
                                y : 0.731
                            }
                        ],
                        line : [
                            {
                                x : 0.859,
                                y : 0.417
                            },
                            {
                                x : 0.859,
                                y : 0.648
                            },
                            {
                                x : 0.792,
                                y : 0.843
                            }
                        ],
                        polygon : [
                            {
                                x : 0.505,
                                y : 0.62
                            },
                            {
                                x : 0.6875,
                                y : 0.37
                            },
                            {
                                x : 0.9995,
                                y : 0.509
                            },
                            {
                                x : 0.9995,
                                y : 0.972
                            }
                        ]
                    }
                ]
            },
            heatMap : {
                online : true,
                params : [
                    {
                        polygon : [
                            {
                                x : 0.34,
                                y : 0.307
                            },
                            {
                                x : 0.09,
                                y : 0.378
                            },
                            {
                                x : 0.05,
                                y : 0.478
                            },
                            {
                                x : 0.063,
                                y : 0.657
                            },
                            {
                                x : 0.105,
                                y : 0.87
                            },
                            {
                                x : 0.208,
                                y : 0.994
                            },
                            {
                                x : 0.702,
                                y : 0.993
                            },
                            {
                                x : 0.805,
                                y : 0.604
                            },
                            {
                                x : 0.82,
                                y : 0.463
                            },
                            {
                                x : 0.705,
                                y : 0.441
                            },
                            {
                                x : 0.61,
                                y : 0.414
                            },
                            {
                                x : 0.5,
                                y : 0.389
                            },
                            {
                                x : 0.42,
                                y : 0.37
                            },
                            {
                                x : 0.37,
                                y : 0.389
                            }
                        ]
                    }
                ]
            },
            hesitate : {
                online : false,
                params : [
                    {
                        duration : 120,
                        polygon : [
                            {
                                x : 0,
                                y : 0
                            },
                            {
                                x : 1,
                                y : 0
                            },
                            {
                                x : 0,
                                y : 1
                            },
                            {
                                x : 1,
                                y : 1
                            }
                        ]
                    }
                ]
            }
        },
        {
            counting : {
                online : true,
                params : [
                    {
                        direction : [
                            {
                                x : 0.677,
                                y : 0.579
                            },
                            {
                                x : 0.932,
                                y : 0.731
                            }
                        ],
                        line : [
                            {
                                x : 0.859,
                                y : 0.417
                            },
                            {
                                x : 0.859,
                                y : 0.648
                            },
                            {
                                x : 0.792,
                                y : 0.843
                            }
                        ],
                        polygon : [
                            {
                                x : 0.505,
                                y : 0.62
                            },
                            {
                                x : 0.6875,
                                y : 0.37
                            },
                            {
                                x : 0.9995,
                                y : 0.37
                            },
                            {
                                x : 0.9995,
                                y : 0.972
                            }
                        ]
                    }
                ]
            },
            heatMap : {
                online : false,
                params : []
            },
            hesitate : {
                online : false,
                params : []
            }
        },
        {
            counting : {
                online : true,
                params : [
                    {
                        direction : [
                            {
                                x : 0.677,
                                y : 0.579
                            },
                            {
                                x : 0.932,
                                y : 0.731
                            }
                        ],
                        line : [
                            {
                                x : 0.859,
                                y : 0.417
                            },
                            {
                                x : 0.859,
                                y : 0.648
                            },
                            {
                                x : 0.792,
                                y : 0.843
                            }
                        ],
                        polygon : [
                            {
                                x : 0.505,
                                y : 0.62
                            },
                            {
                                x : 0.6875,
                                y : 0.37
                            },
                            {
                                x : 0.9995,
                                y : 0.37
                            },
                            {
                                x : 0.9995,
                                y : 0.972
                            }
                        ]
                    }
                ]
            },
            heatMap : {
                online : false,
                params : []
            },
            hesitate : {
                online : false,
                params : []
            }
        }
    ]
}

export let imgsDefault = [
    {
        src:`${url}/static/cameraImgs/gather.jpg`,
        polygon:[],
        direction:[],
        line:[],
        selectPoly: -1,
        parmasToken: []
    },
    {
        src:`${url}/static/cameraImgs/entry.jpg`,
        // src:`${url}/static/cameraImgs/gather.jpg`,
        polygon:[],
        direction:[],
        line:[],
        selectPoly: -1,
        parmasToken: []
    },
    {
        src:`${url}/static/cameraImgs/gather.jpg`,
        polygon:[],
        direction:[],
        line:[],
        selectPoly: -1,
        parmasToken: []
    },
]