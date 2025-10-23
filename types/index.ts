export interface Card {
  id: string
  campaign: string
  name: string
  content: string
  date?: string
  status: 'reply' | 'followup' | 'ooo' | 'meeting'
}