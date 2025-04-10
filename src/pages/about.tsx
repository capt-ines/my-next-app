import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import React from "react";

function About({}) {
  return (
    <div className="mx-content">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <section>
        <h1>Not your usual mindfulness app.</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque,
          illum nostrum suscipit quasi ab sed dicta consequuntur asperiores
          vitae, eius eligendi unde temporibus laborum est aut eum natus
          dolorum! Rerum?
        </p>
      </section>
    </div>
  );
}

export default About;
