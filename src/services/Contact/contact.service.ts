import { Contact } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";

export const createContactService = async (contactData: any) => {
  const contactRepository = AppDataSource.getRepository(Contact);
  const contact = contactRepository.create(contactData);
  return contactRepository.save(contact);
};

export const getAllContactsService = async (): Promise<Contact[]> => {
  const contactRepository = AppDataSource.getRepository(Contact);
  return contactRepository.find({ relations: { customer: true } });
};

export const getContactByIdService = async (paramsId: number) => {
  const contactRepository = AppDataSource.getRepository(Contact);
  const contact = await contactRepository.findOne({
    where: {
      id: paramsId,
    },
    relations: {
      customer: true,
    },
  });
  if (!contact) {
    throw new AppError("contact not found", 404);
  }
  return contact;
};

export const updateContactService = async (
  paramsId: number,
  contactData: Partial<Contact>
) => {
  const contactRepository = AppDataSource.getRepository(Contact);
  await contactRepository.update(paramsId, contactData);
  return contactRepository.findOne({
    where: {
      id: paramsId,
    },
  });
};

export const deleteContactService = async (id: number): Promise<void> => {
  const contactRepository = AppDataSource.getRepository(Contact);
  await contactRepository.delete(id);
};
