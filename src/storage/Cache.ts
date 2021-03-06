import md5 from 'blueimp-md5'
import { VideoInfo } from '../http/Client'
import { Service } from '../http/Service'

export default class Cache {
  private readonly prefix: string;

  constructor () {
    this.prefix = 'noteflix_'
  }

  save (videoInfo: VideoInfo, service: Service): VideoInfo {
    videoInfo.hashId = md5(`${service}_${videoInfo.name}`)
    sessionStorage.setItem(this.prefix + videoInfo.hashId, JSON.stringify(videoInfo))

    return videoInfo
  }

  get (videoName: string, service: Service) {
    const hashId = md5(`${service}_${videoName}`)
    return JSON.parse(sessionStorage.getItem(this.prefix + hashId))
  }

  exists (videoName: string, service: Service) {
    const hashId = md5(`${service}_${videoName}`)
    return sessionStorage.getItem(this.prefix + hashId)
  }
}
