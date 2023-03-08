import { Injectable } from '@nestjs/common'

@Injectable()
export class CompService {
  private urls: Record<string, string> = {}

  async shortenUrl(url: string): Promise<string> {
    const shortUrl = `http://localhost:3000/`
    this.urls[shortUrl] = url
    return shortUrl
  }

  async getUrls(): Promise<string[]> {
    return Object.values(this.urls)
  }
}
