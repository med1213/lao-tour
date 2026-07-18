import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Content } from './content.entity';

export const defaultHomeContent = {
  navigation: { brand: 'Lao Tour', explore: 'Explore', journeys: 'Journeys', about: 'About Laos', admin: 'Admin portal' },
  hero: { eyebrow: 'Discover Laos, slowly', title: 'Start your unforgettable', emphasis: 'journey with us.', description: 'From quiet rivers and golden temples to mountain paths — find the Laos that feels personal.', button: 'Explore now', image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=2400&q=90' },
  search: { destination: 'Destination', style: 'Travel style', when: 'When', destinationValue: 'Explore Laos', styleValue: 'Any experience', whenValue: 'Any time of year' },
  destinations: { eyebrow: 'Go somewhere meaningful', title: 'Popular destinations', description: 'Most popular destinations around Laos, from ancient capitals and hidden waterfalls to beautiful natural wonders.' },
  offers: { eyebrow: 'Thoughtfully curated', title: 'Special offers', description: 'A carefully designed escape with local stays, memorable routes, and time to simply be.', button: 'DETAILS', from: 'From' },
  journal: { eyebrow: 'Our travel journal', title: 'Beautiful Laos.\nLet’s travel slowly.', description: 'The best discoveries are rarely rushed. Follow the river, stop for market coffee, take the mountain road and let a place reveal itself in its own time.', button: 'Read more →', image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1300&q=85' },
  gallery: { eyebrow: 'Through a different lens', title: 'Destination gallery' },
  experiences: { eyebrow: 'Real stories, real journeys', title: 'Traveller’s experiences', quotes: ['Every detail felt considered, but the journey still had space to surprise us.', 'Our favourite days were the unplanned ones — coffee, quiet views and kind people.', 'A beautiful way to experience Laos beyond the usual itinerary.'] },
  newsletter: { eyebrow: 'Stay inspired', title: 'Our newsletter', description: 'Stories and thoughtful travel notes, occasionally.', placeholder: 'Enter your email', button: 'Subscribe' },
  footer: { tagline: 'Slow down. Look closer. Travel beautifully.', copyright: '© 2026 Lao Tour · Crafted in Laos' }
};

@Injectable()
export class ContentService {
  constructor(@InjectRepository(Content) private content: Repository<Content>) {}
  async home() { let item = await this.content.findOneBy({ key: 'home' }); if (!item) item = await this.content.save({ key: 'home', data: defaultHomeContent }); return item; }
  async updateHome(data: Record<string, any>) { const existing = await this.home(); return this.content.save({ ...existing, data }); }
}

