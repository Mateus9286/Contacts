import { AppDataSource } from "../../data-source";
import { Customer } from "../../entities";
import { customerSchemaResponse } from "../../schemas/customer.schemas";

export const createCustomerService = async (
  customerData: Partial<Customer>
) => {
  const customerRepository = AppDataSource.getRepository(Customer);
  const customer = customerRepository.create(customerData);
  await customerRepository.save(customer);
  return customerSchemaResponse.parse(customer);
};

export const updateCustomerService = async (
  customerId: number,
  customerData: Partial<Customer>
) => {
  const customerRepository = AppDataSource.getRepository(Customer);
  const customer: Customer | null = await customerRepository.findOneBy({
    id: customerId,
  });

  const updatedCustomer: Customer = customerRepository.create({
    ...customer,
    ...customerData,
  });

  await customerRepository.save(updatedCustomer);
  return customerSchemaResponse.parse(updatedCustomer);
};

export const deleteCustomerService = async (
  customerId: number
): Promise<void> => {
  const userRepository = AppDataSource.getRepository(Customer);
  const user: Customer | null = await userRepository.findOneBy({
    id: customerId,
  });
  await userRepository.remove(user!);
  return;
};
