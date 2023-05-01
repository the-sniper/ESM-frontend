import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomButton from "../../components/atoms/buttons/CustomButton";
import { mapData } from "../../utils";

function Step1() {
  const validationArray = Yup.object({
    service: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      service: "",
    },
    validationSchema: validationArray,
    onSubmit: (values) => {},
  });
  const formValues = [
    {
      label: "Service",
      name: "service",
      type: "select",
      options: [
        {
          show: "Air Force",
          value: "airforce",
        },
        {
          show: "Army",
          value: "army",
        },
        {
          show: "Navy",
          value: "navy",
        },
      ],
      class: "col-6",
      formik: formik,
    },
    {
      label: "Record office",
      placeholder: "Enter record office name",
      name: "record_office",
      type: "select",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Rank category",
      name: "rank_category",
      type: "select",
      options: [
        {
          show: "1",
          value: "1",
        },
      ],
      class: "col-6",
      formik: formik,
    },
    {
      label: "Rank",
      name: "rank",
      type: "select",
      options: [
        {
          show: "1",
          value: "1",
        },
      ],
      class: "col-6",
      formik: formik,
    },
    {
      label: "Group",
      name: "group",
      type: "select",
      options: [
        {
          show: "1",
          value: "1",
        },
      ],
      class: "col-6",
      formik: formik,
    },
    {
      label: "Trade/Branch",
      name: "trade_branch",
      type: "select",
      options: [
        {
          show: "1",
          value: "1",
        },
      ],
      class: "col-6",
      formik: formik,
    },
    {
      label: "Enrollment date",
      name: "enrollment_date",
      type: "date",
      class: "col-6",
      formik: formik,
    },
    {
      label: "World war II veteran",
      name: "ww2_veteran",
      type: "select",
      options: [
        {
          show: "1",
          value: "1",
        },
      ],
      class: "col-6",
      formik: formik,
    },
    {
      label: "Operations attended",
      name: "trade_branch",
      type: "text",
      placeholder: "Enter the operations attended",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Decorations",
      name: "decorations",
      type: "text",
      placeholder: "Enter your decorations",
      class: "col-6",
      formik: formik,
    },
  ];
  return (
    <div>
      <div className="row">{Object.values(mapData(formValues))}</div>
      <CustomButton label="Save" type="submit" buttonType="primary" />
    </div>
  );
}

export default Step1;
