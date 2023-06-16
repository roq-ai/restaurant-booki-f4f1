import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getTableLayoutById, updateTableLayoutById } from 'apiSdk/table-layouts';
import { Error } from 'components/error';
import { tableLayoutValidationSchema } from 'validationSchema/table-layouts';
import { TableLayoutInterface } from 'interfaces/table-layout';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { RestaurantInterface } from 'interfaces/restaurant';
import { getRestaurants } from 'apiSdk/restaurants';

function TableLayoutEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<TableLayoutInterface>(
    () => (id ? `/table-layouts/${id}` : null),
    () => getTableLayoutById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: TableLayoutInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateTableLayoutById(id, values);
      mutate(updated);
      resetForm();
      router.push('/table-layouts');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<TableLayoutInterface>({
    initialValues: data,
    validationSchema: tableLayoutValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Table Layout
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="table_number" mb="4" isInvalid={!!formik.errors?.table_number}>
              <FormLabel>Table Number</FormLabel>
              <NumberInput
                name="table_number"
                value={formik.values?.table_number}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('table_number', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.table_number && <FormErrorMessage>{formik.errors?.table_number}</FormErrorMessage>}
            </FormControl>
            <FormControl id="capacity" mb="4" isInvalid={!!formik.errors?.capacity}>
              <FormLabel>Capacity</FormLabel>
              <NumberInput
                name="capacity"
                value={formik.values?.capacity}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('capacity', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.capacity && <FormErrorMessage>{formik.errors?.capacity}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<RestaurantInterface>
              formik={formik}
              name={'restaurant_id'}
              label={'Select Restaurant'}
              placeholder={'Select Restaurant'}
              fetcher={getRestaurants}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'table_layout',
  operation: AccessOperationEnum.UPDATE,
})(TableLayoutEditPage);
