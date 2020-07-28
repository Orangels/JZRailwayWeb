export function randomNum(minNum,maxNum){
    switch(arguments.length){
        case 1:
            return parseInt(Math.random()*minNum+1,10);
            break;
        case 2:
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
            break;
        default:
            return 0;
            break;
    }
}

export function randomNum_f(minNum,maxNum){
    switch(arguments.length){
        case 1:
            return parseInt(Math.random()*minNum+1,10);
            break;
        case 2:
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
            break;
        default:
            return 0;
            break;
    }
}


export let _fetch = async (url,data,resolve) =>{
    try {
        let response = await fetch(url,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            mode:"cors",
            body: JSON.stringify(data)
        });
        let json  = await response.json();
        resolve(json);
    } catch(error) {
        console.log(error);
    }
};


export let _download_file = async (url,data,resolve) =>{
    try {
        let response = await fetch(url,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            mode:"cors",
            body: JSON.stringify({
                data
            })
        });
        let blob  = await response.blob();
        resolve(blob);
    } catch(error) {
        console.log(error);
    }
};



export function get_state_count(count_arr, state) {
    // [非常, 比较, 正常, 非常不]
    if (state >70  && state <= 100){
        count_arr[0] = count_arr[0] + 1
    }
    if (state > 50 && state <= 70){
        count_arr[1] = count_arr[1] + 1
    }
    if (state > 30 && state <= 50){
        count_arr[2] = count_arr[2] + 1
    }
    if (state >= 0 && state <= 30){
        count_arr[3] = count_arr[3] + 1
    }
    return count_arr
}

export function get_2_float(x) {
    return  Math.round(x*10000)/100;
}

export function show_2_ste(s) {
    return s.toString().substr(0,2)

}

export function get_pie_data(count_arr, name) {

    // [非常, 比较, 正常, 非常不]

    // let aaa = [
    //     {
    //         item: "非常活跃",
    //         count: 30
    //     },
    //     {
    //         item: "非常不活跃",
    //         count: 20
    //     },
    //     {
    //         item: "正常活跃",
    //         count: 27
    //     },
    //     {
    //         item: "比较活跃",
    //         count: 23
    //     },
    // ];

    let total_count = count_arr[0] + count_arr[1] + count_arr[2] + count_arr[3]

    let count_arr_tmp = [
        get_2_float(count_arr[0]/total_count),
        get_2_float(count_arr[1]/total_count),
        get_2_float(count_arr[2]/total_count),
        get_2_float(count_arr[3]/total_count),
    ]

    let return_data = [
        {
            item:`非常${name}`,
            count:count_arr_tmp[0],
        },
        {
            item:`比较${name}`,
            count:count_arr_tmp[1],
        },
        {
            item:`正常${name}`,
            count:count_arr_tmp[2],
        },
        {
            item:`非常不${name}`,
            count:count_arr_tmp[3],
        }
    ]
    // console.log(return_data)
    return return_data

}

export function show_2_int(s){
    return s < 10 ? '0' + s: s;
}

export function deepCopy(obj) {
    // 只拷贝对象
    if (typeof obj !== 'object') return;
    // 根据obj的类型判断是新建一个数组还是一个对象
    let newObj = obj instanceof Array ? [] : {};
    for (let key in obj) {
        // 遍历obj,并且判断是obj的属性才拷贝
        if (obj.hasOwnProperty(key)) {
            // 判断属性值的类型，如果是对象递归调用深拷贝
            newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
        }
    }
    return newObj
}


export function diff(obj1,obj2){
    var o1 = obj1 instanceof Object;
    var o2 = obj2 instanceof Object;
    // 判断是不是对象
    if (!o1 || !o2) {
        return obj1 === obj2;
    }

    //Object.keys() 返回一个由对象的自身可枚举属性(key值)组成的数组,
    //例如：数组返回下表：let arr = ["a", "b", "c"];console.log(Object.keys(arr))->0,1,2;
    if (Object.keys(obj1).length !== Object.keys(obj2).length) {
        return false;
    }

    for (var o in obj1) {
        var t1 = obj1[o] instanceof Object;
        var t2 = obj2[o] instanceof Object;
        if (t1 && t2) {
            return diff(obj1[o], obj2[o]);
        } else if (obj1[o] !== obj2[o]) {
            return false;
        }
    }
    return true;
}

/*
** 时间戳转换成指定格式日期
** eg.
** dateFormat(11111111111111, 'Y年m月d日 H时i分')
** → "2322年02月06日 03时45分"
*/
export let dateFormat = function (timestamp, formats) {
    // formats格式包括
    // 1. Y-m-d
    // 2. Y-m-d H:i:s
    // 3. Y年m月d日
    // 4. Y年m月d日 H时i分

    formats = formats || 'Y-m-d H:i:s';


    var zero = function (value) {
        if (value < 10) {
            return '0' + value;
        }
        return value;
    };

    var myDate = timestamp? new Date(timestamp): new Date();

    var year = myDate.getFullYear();
    var month = zero(myDate.getMonth() + 1);
    var day = zero(myDate.getDate());

    var hour = zero(myDate.getHours());
    var minite = zero(myDate.getMinutes());
    var second = zero(myDate.getSeconds());

    return formats.replace(/Y|m|d|H|i|s/ig, function (matches) {
        return ({
            Y: year,
            m: month,
            d: day,
            H: hour,
            i: minite,
            s: second
        })[matches];
    });
};

export let getBase64 = function (img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}