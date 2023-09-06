import React from "react";
import CustomCheckbox from "../components/atoms/inputs/CustomCheckbox";
import CustomRadio from "../components/atoms/inputs/CustomRadio";
import CustomSelect from "../components/atoms/inputs/CustomSelect";
import CustomTextarea from "../components/atoms/inputs/CustomTextarea";
import Uploader from "./uploader";
import CustomInput from "../components/atoms/inputs/CustomInput";
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment/moment";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

let serverTime = new Date();
const monthFormat = "YYYY-MM";
const dateFormat = "DD-MM-YYYY";
const dateTimeFormat = "MM-DD-YYYY h:mm a";
const timeFormat = "h:mm a";

export const LOGO = "/assets/images/logo.png";
export const SITE_NAME = "Department of Sainik Welfare, Puducherry";

const converDate = (data) => {
  let dataReturn = "";
  if (data) {
    if (moment(data).isValid()) {
      dataReturn = `${moment(data).format(dateFormat)}`;
    }
  }
  return dataReturn;
};

const errorCheck = (data, formik) => {
  return data.filter &&
    formik &&
    formik.touched &&
    formik.touched.filters &&
    formik.touched.filters[data.name] &&
    formik.errors &&
    formik.errors.filters &&
    formik.errors.filters[data.name]
    ? formik.errors.filters[data.name]
    : formik.touched[data.name] && formik.errors[data.name];
};

const helpertext = (data, formik) => {
  return data.filter &&
    formik &&
    formik.touched &&
    formik.touched.filters &&
    formik.touched.filters[data.name] &&
    formik.errors &&
    formik.errors.filters &&
    formik.errors.filters[data.name]
    ? formik.errors.filters[data.name]
    : formik.touched[data.name] && formik.errors[data.name];
};

export const mapData = (page, props) => {
  let formik = page.formik ? page.formik : page[0].formik;
  let pageData = page.data ? page.data : page;

  let data = pageData.map((data, index) => (
    <>
      <div key={index} className={data.class}>
        {data.type === "select" ? (
          <>
            <CustomSelect
              label={data.label}
              id={data.id}
              value={
                data.filter
                  ? formik.values.filters[data.name].value
                  : formik.values[data.name]
              }
              autoFocus={data.autoFocus}
              name={data.filter ? `filters.${data.name}.value` : data.name}
              size={data.size}
              onChange={data.onChange ? data.onChange : formik.handleChange}
              placeholder={data.placeholder}
              disabled={data.disabled}
              onBlur={formik.handleBlur}
              type={data.type}
              options={data.options}
              error={errorCheck(data, formik)}
              helpertext={helpertext(data, formik)}
            ></CustomSelect>
          </>
        ) : data.type === "check" ? (
          <>
            {data.options &&
              data.options.map((opt, optindex) => (
                <CustomCheckbox
                  key={optindex}
                  name={data.name}
                  disabled={data.disabled}
                  label={opt.description}
                  checked={
                    formik.values[data.name].indexOf(opt.id.toString()) !== -1
                      ? true
                      : false
                  }
                  value={opt.id.toString()}
                  onChange={formik.handleChange}
                />
              ))}
            <div className="checkboxError">
              <p>
                {formik.errors[data.name] &&
                  formik.touched[data.name] &&
                  formik.errors[data.name]}
              </p>
            </div>
          </>
        ) : data.type === "date" ? (
          <DemoContainer components={["DatePicker"]}>
            {console.log(formik.values[data.name], "checkDate")}
            <DatePicker
              // autoOk={true}
              // showTodayButton={true}
              // id={data.name}
              // inputVariant="outlined"
              label={data.label}
              format={dateFormat}
              disabled={data.disabled}
              disableFuture={data.disableFuture || false}
              disablePast={data.disablePast || false}
              // maxDate={data.maxDate || moment("01-01-2100").format(dateFormat)}
              // maxDateMessage={
              //   data.maxDateMessage || "Date should not be after maximal date"
              // }
              // minDate={data.minDate || moment("01-01-1900").format(dateFormat)}
              // minDateMessage={
              //   data.minDateMessage || "Date should not be before minimal date"
              // }
              className="customDatepicker"
              // inputValue={
              //   data.filter
              //     ? formik.values.filters[data.name].value || null
              //     : formik.values[data.name] || null
              // }
              // value={
              //   formik.values[data.name] &&
              //   moment(formik.values[data.name], dateFormat).isValid()
              //     ? moment(formik.values[data.name], dateFormat)
              //     : null
              // }
              // onChange={(val) => {
              //   if (moment(val, dateFormat).isValid()) {
              //     formik.setFieldValue(data.name, val);
              //   } else {
              //     console.error("Invalid date:", val);
              //   }
              // }}

              // KeyboardButtonProps={{
              //   "aria-label": "change date",
              // }}
              // error={formik.touched[data.name] && formik.errors[data.name]}
              // helpertext={
              //   formik.errors[data.name] &&
              //   formik.touched[data.name] &&
              //   formik.errors[data.name]
              // }
            />
          </DemoContainer>
        ) : data.type === "uploadDropZone" ? (
          <>
            <Uploader
              formik={formik}
              name={data.name}
              icon={data.icon}
              titleText={data.titleText}
              innerText={data.innerText}
              folder={data.folder}
              multiple={data.multiple}
              accept={data.accept}
            ></Uploader>
          </>
        ) : data.type === "textarea" ? (
          <>
            <CustomTextarea
              id={data.id}
              value={formik.values[data.name]}
              autoFocus={data.autoFocus}
              name={data.name}
              disabled={data.disabled}
              shrink={formik.values[data.name] && true}
              onBlur={formik.handleBlur}
              onChange={data.onChange ? data.onChange : formik.handleChange}
              label={data.label}
              placeholder={data.placeholder}
              type={data.type}
              error={formik.touched[data.name] && formik.errors[data.name]}
              helpertext={
                formik.errors[data.name] &&
                formik.touched[data.name] &&
                formik.errors[data.name]
              }
            />
          </>
        ) : data.type === "checkbox" ? (
          <>
            <CustomCheckbox
              checked={formik.values[data.name]}
              label={data.label}
              value={true}
              disabled={data.disabled}
              onChange={() => {
                formik.setFieldValue(data.name, !formik.values[data.name]);
              }}
              name={data.name}
              error={formik.touched[data.name] && formik.errors[data.name]}
              helpertext={
                formik.errors[data.name] &&
                formik.touched[data.name] &&
                formik.errors[data.name]
              }
            />
          </>
        ) : data.type === "checkboxarray" ? (
          data.item.map((d, i) => (
            <>
              <CustomCheckbox
                name={data.name}
                label={d.description}
                checked={
                  formik.values[data.name].indexOf(d.id.toString()) !== -1
                    ? true
                    : false
                }
                value={d.id.toString()}
                onChange={formik.handleChange}
              />
            </>
          ))
        ) : data.type === "radio" ? (
          <>
            {console.log(formik.values[data.name], "radioValue1")}
            <CustomRadio
              error={formik.touched[data.name] && formik.errors[data.name]}
              helpertext={
                formik.errors[data.name] &&
                formik.touched[data.name] &&
                formik.errors[data.name]
              }
              label={data.label}
              name={data.name}
              options={data.options}
              value={formik.values[data.name]}
              onChange={formik.handleChange}
              int={data.int}
            />
          </>
        ) : (
          <>
            <CustomInput
              id={data.id}
              value={
                data.filter
                  ? formik.values.filters[data.name].value
                  : data.value
                  ? data.value
                  : formik.values[data.name]
              }
              autoFocus={data.autoFocus}
              name={data.filter ? `filters.${data.name}.value` : data.name}
              disabled={data.disabled}
              shrink={
                data.filter
                  ? formik.values.filters[data.name].value
                    ? true
                    : false
                  : formik.values[data.name]
                  ? true
                  : false
              }
              onBlur={formik.handleBlur}
              onChange={data.onChange ? data.onChange : formik.handleChange}
              label={data.label}
              placeholder={data.placeholder}
              type={data.type}
              size={data.size}
              startAdornment={data.startAdornment}
              endAdornment={data.endAdornment}
              error={errorCheck(data, formik)}
              helpertext={helpertext(data, formik)}
              inputStyle={data.inputStyle}
              required={data.required}
            />
          </>
        )}
      </div>
    </>
  ));
  return data;
};

export const handleRedirectInternal = (history, path) => {
  history.push(`/${path}`);
  window.scrollTo(0, 0);
};

export const greetingBasedOnTime = (greeting) => {
  const hour = new Date().getHours();

  if (hour < 12) {
    return (
      <>
        <img
          src="/assets/images/sunrise.png"
          className="greetingIcon"
          alt="Good Morning"
        />
        {greeting ? greeting : "Good morning"}
      </>
    );
  } else if (hour < 18) {
    return (
      <>
        <img
          src="/assets/images/dawn.png"
          className="greetingIcon"
          alt="Good Afternoon"
        />
        {greeting ? greeting : "Good afternoon"}
      </>
    );
  } else {
    return (
      <>
        <img
          src="/assets/images/night.png"
          className="greetingIcon"
          alt="Good Evening"
        />
        {greeting ? greeting : "Good evening"}
      </>
    );
  }
};

export const cleanDropdownData = (options, show, value) => {
  if (options && options.length) {
    let convertedData = options.map((data) => {
      let dataCleaned = {};
      dataCleaned.show = data[show];
      dataCleaned.value = data[value];
      return dataCleaned;
    });
    return convertedData;
  }
};
