import React, { useState } from 'react'

import { Field, FieldProps } from 'formik'
import moment from 'moment'
import { DateRangePicker, FocusedInputShape } from 'react-dates'
import Media from 'react-media'
import { Col, FormGroup, Row } from 'reactstrap'

import { DateRange } from '../../algorithms/Param.types'

export interface FormInputProps {
  id: string
  label: string
  allowPast?: boolean
}

export default function FormDatePicker({
  id,
  label,
  allowPast = true,
}: FormInputProps) {
  const [focusedInput, setFocusedInput] = useState<FocusedInputShape| null>(null) // prettier-ignore

  return (
    <Field name={id}>
      {({
        field: { value, onChange },
        form: { setFieldValue },
      }: FieldProps<DateRange>) => {
        return (
          <FormGroup className="my-0">
            <Row noGutters>
              <Col xl={7}>
                <label htmlFor={id}>{label}</label>
              </Col>
              <Col xl={5}>
                <Media
                  queries={{
                    tiny: { maxWidth: 899 },
                    small: { minWidth: 900, maxWidth: 1199 },
                    medium: { minWidth: 1200, maxWidth: 1499 },
                    large: { minWidth: 1500 },
                  }}
                >
                  {media => {
                    const { small, medium, large } = media

                    const numberOfMonths = small ? 2 : medium ? 3 : 4
                    const orientation = small ? 'vertical' : 'horizontal'
                    const withPortal = small

                    const { tMin, tMax } = value

                    return (
                      <DateRangePicker
                        startDate={moment(tMin)}
                        startDateId={`${id}_start_date_id`}
                        endDate={moment(tMax)}
                        endDateId={`${id}_end_date_id`}
                        onDatesChange={({ startDate, endDate }) => {
                          if (startDate && endDate) {
                            setFieldValue(id, {
                              tMin: startDate.toDate(),
                              tMax: endDate.toDate(),
                            })
                          } else if (startDate) {
                            setFieldValue(id, {
                              ...value,
                              tMin: startDate.toDate(),
                            })
                          } else if (endDate) {
                            setFieldValue(id, {
                              ...value,
                              tMax: endDate.toDate(),
                            })
                          }
                        }}
                        focusedInput={focusedInput}
                        onFocusChange={focusedInput =>
                          setFocusedInput(focusedInput)
                        }
                        isOutsideRange={() => !allowPast}
                        numberOfMonths={numberOfMonths}
                        orientation={orientation}
                        withPortal={withPortal}
                        // required
                        displayFormat="DD MMM YYYY"
                        // startDatePlaceholderText="Start Date"
                        // endDatePlaceholderText="End Date"
                        small
                        // customArrowIcon={<>{/* Empty component */}</>}
                      />
                    )
                  }}
                </Media>
              </Col>
            </Row>
          </FormGroup>
        )
      }}
    </Field>
  )
}
