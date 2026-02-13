import Search from '@/components/shared/Search';
import { getOrdersByEvent } from '@/lib/actions/order.actions';
import { IOrderItem } from '@/lib/database/models/order.model';
import { formatDateTime, formatPrice } from '@/lib/utils';
import { SearchParamProps } from '@/types';
import React from 'react';

export type IOrderItems = {
  _id: string;
  totalAmount: string;
  createdAt: Date;
  eventTitle: string;
  eventId: string;
  buyer: string;
  buyerMail: string;
};

const Orders = async ({ searchParams }: SearchParamProps) => {
  const eventId = (searchParams?.eventId as string) || '';
  const searchText = (searchParams?.query as string) || '';

  const orders = await getOrdersByEvent({ searchString: searchText, eventId });

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">Orders</h3>
      </section>

      <section className="wrapper mt-8">
        <Search placeholder="Search buyer name..." />
      </section>

      <section className="wrapper overflow-x-auto">
        <table className="w-full border-collapse border-t">
          <thead>
            <tr className="p-medium-14 border-b text-grey-500">
              <th className="min-w-[120px] sm:min-w-[200px] py-3 px-2 sm:py-4 sm:px-4 text-left">
                Order ID
              </th>
              <th className="min-w-[150px] sm:min-w-[200px] flex-1 py-3 px-2 sm:py-4 sm:px-4 text-left">
                Event Title
              </th>
              <th className="min-w-[120px] sm:min-w-[150px] py-3 px-2 sm:py-4 sm:px-4 text-left">
                Buyer
              </th>
              <th className="hidden md:table-cell min-w-[150px] py-3 px-2 sm:py-4 sm:px-4 text-left">
                Buyer Email
              </th>
              <th className="hidden lg:table-cell min-w-[100px] py-3 px-2 sm:py-4 sm:px-4 text-left">
                Created
              </th>
              <th className="min-w-[80px] sm:min-w-[100px] py-3 px-2 sm:py-4 sm:px-4 text-right">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.length === 0 ? (
              <tr className="border-b">
                <td
                  colSpan={6}
                  className="py-6 px-2 sm:px-4 text-center text-gray-500"
                >
                  No Orders Found.
                </td>
              </tr>
            ) : (
              <>
                {orders &&
                  orders.map((row: IOrderItems) => (
                    <tr
                      key={row._id}
                      className="p-regular-14 lg:p-regular-16 border-b hover:bg-gray-50 transition-colors"
                      style={{ boxSizing: 'border-box' }}
                    >
                      <td className="min-w-[120px] sm:min-w-[200px] py-4 px-2 sm:py-5 sm:px-4 text-primary-500 text-xs sm:text-sm break-all">
                        <span className="line-clamp-2 sm:line-clamp-none">
                          {row._id}
                        </span>
                      </td>
                      <td className="min-w-[150px] sm:min-w-[200px] flex-1 py-4 px-2 sm:py-5 sm:px-4 break-words">
                        <span className="line-clamp-2">{row.eventTitle}</span>
                      </td>
                      <td className="min-w-[120px] sm:min-w-[150px] py-4 px-2 sm:py-5 sm:px-4 break-words">
                        <span className="line-clamp-2">{row.buyer}</span>
                      </td>
                      <td className="hidden md:table-cell min-w-[150px] py-4 px-2 sm:py-5 sm:px-4 break-words">
                        <span className="line-clamp-2">{row.buyerMail}</span>
                      </td>
                      <td className="hidden lg:table-cell min-w-[100px] py-4 px-2 sm:py-5 sm:px-4 whitespace-nowrap text-sm">
                        {formatDateTime(row.createdAt).dateTime}
                      </td>
                      <td className="min-w-[80px] sm:min-w-[100px] py-4 px-2 sm:py-5 sm:px-4 text-right whitespace-nowrap font-semibold">
                        {formatPrice(row.totalAmount)}
                      </td>
                    </tr>
                  ))}
              </>
            )}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default Orders;
