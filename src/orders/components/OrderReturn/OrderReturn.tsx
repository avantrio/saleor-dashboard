import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import { makeStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import CardMenu from "@saleor/components/CardMenu";
import CardTitle from "@saleor/components/CardTitle";
import Money from "@saleor/components/Money";
import ResponsiveTable from "@saleor/components/ResponsiveTable";
import Skeleton from "@saleor/components/Skeleton";
import StatusLabel from "@saleor/components/StatusLabel";
import TableCellAvatar, {
  AVATAR_MARGIN
} from "@saleor/components/TableCellAvatar";
import { mergeRepeatedOrderLines } from "@saleor/orders/utils/data";
import classNames from "classnames";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { getStringOrPlaceholder, maybe, renderCollection } from "../../../misc";
import { FulfillmentStatus } from "../../../types/globalTypes";
import { OrderDetails_order_fulfillments, OrderDetails_return } from "../../types/OrderDetails";

const useStyles = makeStyles(
  theme => ({
    clickableRow: {
      cursor: "pointer"
    },
    colName: {
      width: "auto"
    },
    colNameLabel: {
      marginLeft: AVATAR_MARGIN
    },
    colPrice: {
      textAlign: "right",
      width: 120
    },
    colQuantity: {
      textAlign: "center",
      width: 120
    },
    colSku: {
      textAlign: "right",
      textOverflow: "ellipsis",
      width: 120
    },
    colTotal: {
      textAlign: "right",
      width: 120
    },
    infoLabel: {
      display: "inline-block"
    },
    infoLabelWithMargin: {
      marginBottom: theme.spacing()
    },
    infoRow: {
      padding: theme.spacing(2, 3)
    },
    orderNumber: {
      display: "inline",
      marginLeft: theme.spacing(1)
    },
    statusBar: {
      paddingTop: 0
    },
    table: {
      tableLayout: "fixed"
    }
  }),
  { name: "OrderReturn" }
);

interface OrderReturnProps {
  fulfillment: OrderDetails_return;
  orderNumber: string;
  onReturnConfirmed: (string) => void;
}

const numberOfColumns = 5;

const OrderReturn: React.FC<OrderReturnProps> = props => {
  const {
    fulfillment,
    orderNumber,
    onReturnConfirmed
  } = props;
  const classes = useStyles(props);

  const intl = useIntl();

  const lines = fulfillment?.lines;

  return (
    <Card>
      <CardTitle
        title="Order Return Request"
        toolbar={
          maybe(() => fulfillment.status) === "RETURN_REQUEST" && (
            <CardMenu
              menuItems={[
                {
                  label: intl.formatMessage({
                    defaultMessage: "Confirm Return Request",
                    description: "button"
                  }),
                  onSelect: () => onReturnConfirmed(fulfillment.id)
                }
              ]}
            />
          )
        }
      />
      <ResponsiveTable className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.colName}>
              <span className={classes.colNameLabel}>
                <FormattedMessage
                  defaultMessage="Product"
                  description="product name"
                />
              </span>
            </TableCell>
            <TableCell className={classes.colSku}>
              <FormattedMessage
                defaultMessage="SKU"
                description="ordered product sku"
              />
            </TableCell>
            <TableCell className={classes.colQuantity}>
              <FormattedMessage
                defaultMessage="Return Quantity"
                description="ordered product quantity"
              />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {renderCollection(lines, line => (
            <TableRow
              className={!!line ? classes.clickableRow : undefined}
              hover={!!line}
              key={maybe(() => line.id)}
            >
              <TableCellAvatar
                className={classes.colName}
                thumbnail={maybe(() => line.orderLine.thumbnail.url)}
              >
                {maybe(() => line.orderLine.productName) || <Skeleton />}
              </TableCellAvatar>
              <TableCell className={classes.colSku}>
                {line?.orderLine.productSku || <Skeleton />}
              </TableCell>
              <TableCell className={classes.colQuantity}>
                {line?.quantity || <Skeleton />}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </ResponsiveTable>
    </Card>
  );
};
OrderReturn.displayName = "OrderReturn";
export default OrderReturn;
