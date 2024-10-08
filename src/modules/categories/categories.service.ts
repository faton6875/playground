import { Categories } from './categories.entity';
import { AppDataSource } from '../../config/data-source';

export default class CategoryService {
  private handleServiceError(error: unknown): never {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Unexpected error');
    }
  }

  async getCategories(
    page: number,
    pageSize: number,
    name?: string,
    description?: string,
    search?: string,
    active?: boolean,
    sort?: string
  ): Promise<Categories[]> {
    try {
      const addFilteringParamsToQuery = () => {
        if (active) {
          query.where('category.active = :active', { active: active });
        }
        if (search && search !== 'undefined') {
          query.andWhere(
            "REPLACE(category.name, 'ё', 'е') ILIKE REPLACE(:search, 'ё', 'е') OR REPLACE(category.description, 'ё', 'е') ILIKE REPLACE(:search, 'ё', 'е')",
            { search: `%${search}%` }
          );
        } else {
          if (name && name !== 'undefined') {
            query.andWhere(
              "REPLACE(category.name, 'ё', 'е') ILIKE REPLACE(:name, 'ё', 'е')",
              { name: `%${name}%` }
            );
          }
          if (description && description !== 'undefined') {
            query.andWhere(
              "REPLACE(category.description, 'ё', 'е') ILIKE REPLACE(:description, 'ё', 'е')",
              { description: `%${description}%` }
            );
          }
        }
      };
      const addPaginationParamsToQuery = () => {
        const skip = (page - 1) * pageSize;
        query.skip(skip).take(pageSize);
      };

      const addSortingParamsToQuery = () => {
        if (sort && sort !== 'undefined') {
          sort[0] === '-'
            ? query.orderBy(sort.slice(1), 'DESC')
            : query.orderBy(sort, 'ASC');
        } else {
          query.orderBy('category.createdAt', 'DESC');
        }
      };
      const categoryRepository = AppDataSource.getRepository(Categories);
      const query = categoryRepository.createQueryBuilder('category');
      addFilteringParamsToQuery();
      addSortingParamsToQuery();
      addPaginationParamsToQuery();
      return await query.getMany();
    } catch (error) {
      console.log(error);
      this.handleServiceError(error);
    }
  }

  async getCategoryById(id: string): Promise<Categories> {
    try {
      const categoryRepository = AppDataSource.getRepository(Categories);
      const category = await categoryRepository.findOneBy({ id });
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
      const categoryRepository = AppDataSource.getRepository(Categories);
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
      const categoryRepository = AppDataSource.getRepository(Categories);
      const category = await categoryRepository.findOneById(id);
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
      const categoryRepository = AppDataSource.getRepository(Categories);

      const category = await categoryRepository.findOneById(id);

      if (!category) {
        throw new Error('Category not found');
      } else {
        await categoryRepository.update(id, newData);
        return await categoryRepository.findOneById(id);
      }
    } catch (error) {
      this.handleServiceError(error);
    }
  }

  async createCategory(newData: Categories) {
    try {
      const categoryRepository = AppDataSource.getRepository(Categories);
      return await categoryRepository.save(newData);
    } catch (error) {
      this.handleServiceError(error);
    }
  }
}
