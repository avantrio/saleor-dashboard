import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardTitle from "@saleor/components/CardTitle";
import Skeleton from "@saleor/components/Skeleton";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

interface OrderVinNumberProps {
  vinNumber: string;
}

export const OrderVinNumber: React.FC<OrderVinNumberProps> = ({
  vinNumber
}) => {
  const intl = useIntl();

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage({
          defaultMessage: "VIN Number",
          description: "VIN Number"
        })}
      />
      <CardContent>
        {vinNumber === undefined ? (
          <Skeleton />
        ) : vinNumber === "" ? (
          <Typography color="textSecondary">
            <FormattedMessage defaultMessage="No VIN number" />
          </Typography>
        ) : (
          <Typography>{vinNumber}</Typography>
        )}
      </CardContent>
    </Card>
  );
};
export default OrderVinNumber;
