export const dateFormat = (date: string) => {
  if (!date) {
    return "N/A";
  } else {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
};

export const moneyConverter = (money: number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });

  if (!money) {
    return "N/A";
  } else {
    return formatter.format(money);
  }
};

export const timeConverter = (time: number) => {
  const hour = Math.floor(time / 60);
  const min = time % 60;

  if (!time) {
    return "N/A";
  } else {
    return `${hour}h ${min}m`;
  }
};
