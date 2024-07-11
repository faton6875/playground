import { getRepository } from 'typeorm';
import { Categories } from './entity';

export default class CategoryService {
  async getCategories(): Promise<Categories[]> {
    const categoryRepository = getRepository(Categories);
    const query = categoryRepository.createQueryBuilder('category');
    return await query.getMany();
  }

  async getCategoryById(id: string) {
    const categoryRepository = getRepository(Categories);
    return await categoryRepository.findOne(id);
  }

  async getCategoryBySlug(slug: string) {
    const categoryRepository = getRepository(Categories);
    return await categoryRepository.findOne({ where: { slug: slug } });
  }

  async deletedById(id: string) {
    const categoryRepository = getRepository(Categories);
    return await categoryRepository.delete(id);
  }

  async patchCategoryById(id: string, newData: Partial<Categories>) {
    const categoryRepository = getRepository(Categories);
    await categoryRepository.update(id, newData);
    return await categoryRepository.findOne(id);
  }

  async createCategory(newData: Categories) {
    const categoryRepository = getRepository(Categories);
    return await categoryRepository.save(newData);
  }
}
