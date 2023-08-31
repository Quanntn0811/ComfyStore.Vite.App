import { Form, Link, useLoaderData } from 'react-router-dom'
import FormInput from './FormInput'
import FormSelect from './FormSelect'
import FormRange from './FormRange'
import FormCheckbox from './FormCheckbox'

const Filters = () => {
  const { meta, search, category, company, price, shipping } = useLoaderData()
  return (
    <Form className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 bg-base-200 rounded-md px-8 py-4 gap-x-4 gap-y-8 items-center">
      {/* Seach */}
      <FormInput
        label={'Search Product'}
        name={'search'}
        type={'text'}
        size={'input-sm'}
        defaultValue={search}
      ></FormInput>

      {/* Filter by category */}
      <FormSelect
        list={meta.categories}
        label={'Select Category'}
        name={'category'}
        size={'input-sm'}
        defaultValue={category}
      ></FormSelect>

      {/* Filter by company */}
      <FormSelect
        list={meta.companies}
        label={'Select Company'}
        name={'company'}
        size={'input-sm'}
        defaultValue={company}
      ></FormSelect>

      {/* Filter by price / alphabet */}
      <FormSelect
        list={['a-z', 'z-a', 'high', 'low']}
        label={'Sort by'}
        name={'order'}
        size={'input-sm'}
      ></FormSelect>

      {/* Select price */}
      <FormRange
        label={'Select price'}
        name={'price'}
        size={'range-sm'}
      ></FormRange>

      {/* Check box for free shipping */}
      <FormCheckbox
        label={'free shipping'}
        name={'shipping'}
        size={'checkbox-sm'}
        defaultValue={shipping}
      ></FormCheckbox>

      {/* Search button */}
      <button type="submit" className="btn btn-sm btn-primary">
        search
      </button>

      {/* Reset */}
      <Link to="/products" className="btn btn-accent btn-sm">
        reset
      </Link>
    </Form>
  )
}
export default Filters
