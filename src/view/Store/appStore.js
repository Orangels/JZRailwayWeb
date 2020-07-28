import {observable, action} from 'mobx'
import Queue_len from "../../common/dataStructs"

class AppStore {

    @observable isLogin = true

    @observable entryPersons = new Queue_len(8)

    @observable imgageIcomCoors = []
    @observable heatMapPoints = {}
    @observable trackIDsArr = {}
    @observable trackerArr = []

    @observable trackerTimestamp = "1970-01-01 00:00:00"

    @observable entruUser = []


    @action updateEntryPersons(vPersons){
        this.entryPersons = vPersons
    }

    @action updateImgageIcomCoors(vImgageIcomCoors){
        this.imgageIcomCoors = vImgageIcomCoors
    }

    @action updateHeatMapPoints(vHeatMapPoints) {
        this.heatMapPoints = vHeatMapPoints
    }

    @action updateTrackIDsArr(vTrackIDsArr) {
        this.trackIDsArr = vTrackIDsArr
    }

    @action updateTrackerArr(vTrackerArr){
        this.trackerArr = vTrackerArr
    }

    @action updateEntruUser(vEntruUser) {
        this.entruUser = vEntruUser
    }

    @action updateTrackerTimestamp(vTimestamp){
        this.trackerTimestamp = vTimestamp
    }

    @action initUsers() {
        const localUsers = localStorage['users']?JSON.parse(localStorage['users']):[]
        this.users = [{username: 'admin', password: 'admin', auth:0},...localUsers, ...this.users]
    }
}

export default new AppStore()