import { getRepository } from 'typeorm';
import { Categories } from './entity';

export default class CategoryService {
  private handleServiceError(error: unknown): never {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Unexpected error');
    }
  }

  async getCategories(): Promise<Categories[]> {
    try {
      const categoryRepository = getRepository(Categories);
      const query = categoryRepository.createQueryBuilder('category');
      return await query.getMany();
    } catch (error) {
      this.handleServiceError(error);
    }
  }

  async getCategoryById(id: string): Promise<Categories> {
    try {
      const categoryRepository = getRepository(Categories);
      const category = await categoryRepository.findOne(id);
      if (!category) {
        throw new Error('Category not found');
      } else {
        return category;
      }
    } catch (error) {
      this.handleServiceError(error);
    }
  }

  async getCategoryBySlug(slug: string): Promise<Categories> {
    try {
      const categoryRepository = getRepository(Categories);
      const category = await categoryRepository.findOne({
        where: { slug: slug },
      });
      if (!category) {
        throw new Error('Category not found');
      } else {
        return category;
      }
    } catch (error) {
      this.handleServiceError(error);
    }
  }

  async deleteById(id: string): Promise<void> {
    try {
      const categoryRepository = getRepository(Categories);
      const category = await categoryRepository.findOne(id);
      if (!category) {
        throw new Error('Category not found');
      } else {
        await categoryRepository.delete(id);
      }
    } catch (error) {
      this.handleServiceError(error);
    }
  }

  async patchCategoryById(id: string, newData: Partial<Categories>) {
    try {
      const categoryRepository = getRepository(Categories);

      const category = await categoryRepository.findOne(id);

      if (!category) {
        throw new Error('Category not found');
      } else {
        await categoryRepository.update(id, newData);
        return await categoryRepository.findOne(id);
      }
    } catch (error) {
      this.handleServiceError(error);
    }
  }

  async createCategory(newData: Categories) {
    try {
      const categoryRepository = getRepository(Categories);
      return await categoryRepository.save(newData);
    } catch (error) {
      this.handleServiceError(error);
    }
  }
}
